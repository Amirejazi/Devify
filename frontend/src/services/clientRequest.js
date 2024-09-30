import axios from "axios";

const baseURL = 'http://localhost:8080/api-v1/';

const clientRequest = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

clientRequest.interceptors.response.use(
    response => response,
    async error => {
        const {config, response} = error;
        const originalRequest = config;
        const isLoginRequest = originalRequest.url.includes('auth/login');

        if (response?.status === 401 && !isLoginRequest && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => clientRequest(originalRequest))
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshResponse = await axios.post(`${baseURL}auth/refresh`, null, {
                    withCredentials: true,
                });
                processQueue(null);
                return clientRequest(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                console.error('Error refreshing token:', refreshError);
                // request to backend for delete access & refresh cookies
                try {
                    await axios.post(`${baseURL}auth/delete-auth-cookies`, null, {
                        withCredentials: true,
                    });
                }
                catch (e){
                    console.error('Error for request to delete-auth-cookies:', e);
                }
                return redirectToLogin(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

const redirectToLogin = (error) => {
    console.log('Redirecting to login page');
    window.location.href = '/login'
    return Promise.reject(error);
};

export default clientRequest;