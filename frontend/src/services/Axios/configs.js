import axios from "axios";

const baseURL = 'http://localhost:8000/api-v1/'

const apiRequests = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiRequests.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        console.log("Err", err);
        return Promise.reject(err);
    }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiRequests.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const { config, response, status } = err;
        const originalRequest = config;
        const hasAuthHeader = originalRequest.headers['Authorization'];
        const isLoginRequest = originalRequest.url.includes('auth/login');

        console.log('err: ' ,err);
        console.log('originalRequest: ' ,originalRequest);
        console.log('hasAuthHeader: ' ,hasAuthHeader, typeof hasAuthHeader);
        console.log('isLoginRequest: ' ,isLoginRequest);
        
        if (status === 401 && hasAuthHeader && !isLoginRequest && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return apiRequests(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");

            return new Promise((resolve, reject) => {
                axios.post(baseURL + "auth/refresh", { refresh: refreshToken })
                    .then(({ data }) => {
                        localStorage.setItem("authToken", data.access);
                        apiRequests.defaults.headers['Authorization'] = 'Bearer ' + data.accessToken;
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
                        processQueue(null, data.accessToken);
                        resolve(apiRequests(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        // Use a dedicated function to manage logout and redirection
                        handleLogout();
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(err);
    }
);

const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
};

export default apiRequests;
