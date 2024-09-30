import axios from "axios";
import {cookies} from "next/headers";

const baseURL = 'http://localhost:8080/api-v1/'

let serverRequest = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

serverRequest.interceptors.request.use(
    (config) => {
        const cookieStore = cookies()
        const accessToken = cookieStore.get('access_token');
        // چون وقتی برای تلاش دوباره میخوام ریکویست انجام بشه نمی خوام که کوکی براش ست بشه چون از قبل ست شده
        if (accessToken && !config._retry) {
            config.headers.Cookie = `access_token=${accessToken.value}`;
        }
        return config;
    },
    (err) => {
        console.log("Error on interceptor request: ", err);
        return Promise.reject(err);
    }
);

// مدیریت صف درخواست‌های شکست‌خورده
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

serverRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const {config, response} = err;
        const originalRequest = config;
        const hasAuthCookie = originalRequest.headers['Cookie'];
        const isLoginRequest = originalRequest.url.includes('auth/login');

        if (response && response.status === 401 && hasAuthCookie && !isLoginRequest && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({resolve, reject});
                })
                    .then(token => {
                        originalRequest.headers.Cookie = `access_token=${token}`;
                        return serverRequest(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const cookieStore = cookies();
            const refreshToken = cookieStore.get('refresh_token');

            if (refreshToken) {
                try {
                    const res = await axios.post(`${baseURL}auth/refresh`, null, {
                        headers: {
                            Cookie: `refresh_token=${refreshToken.value}`,
                        },
                    });

                    if (res.status === 200) {
                        const setCookieHeader = res.headers['set-cookie'];
                        let newAccessToken = null;
                        if (setCookieHeader) {
                            const accessTokenCookie = setCookieHeader.find(cookie => cookie.startsWith('access_token='));
                            if (accessTokenCookie) {
                                newAccessToken = accessTokenCookie.split(';')[0].split('=')[1];
                            }
                        }

                        if (newAccessToken) {
                            processQueue(null, newAccessToken);
                            originalRequest.headers.Cookie = `access_token=${newAccessToken}`;
                            return serverRequest(originalRequest);
                        } else {
                            console.log('New access token not found in response');
                        }
                    }
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    console.log('Error refreshing token:', refreshError);
                    throw new Error('TOKEN_REFRESH_FAILED');
                } finally {
                    isRefreshing = false;
                }
            } else {
                throw new Error('NO_REFRESH_TOKEN');
            }
        }

        return Promise.reject(err);
    }
);

// const serverRequest = {
//     request: (url, method = 'get', data = null, config = {}) => {
//         return instance({
//             url,
//             method,
//             data,
//             config,
//         })
//             .then(response => response)
//             .catch(error => {
//                 if (error.message === 'TOKEN_REFRESH_FAILED' || error.message === 'NO_REFRESH_TOKEN') {
//                     redirect('/login');
//                 }
//                 return Promise.reject(error);
//             });
//     },
//
//     get: (url, config = {}) => serverRequest.request(url, 'get', null, config),
//
//     post: (url, data, config = {}) => serverRequest.request(url, 'post', data, config),
//
//     put: (url, data, config = {}) => serverRequest.request(url, 'put', data, config),
//
//     delete: (url, config = {}) => serverRequest.request(url, 'delete', null, config),
// };

export default serverRequest;