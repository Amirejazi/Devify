import axios from "axios";

const baseURL = 'http://localhost:8080/api-v1/'

const apiRequest = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

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

// افزودن اینترسپتور به Axios برای مدیریت پاسخ‌ها
// apiRequest.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (err) => {
//         const { config, response, status } = err;
//         const originalRequest = config;
//
//         // چک می‌کنیم که آیا درخواست لاگین است یا نه
//         const isLoginRequest = originalRequest.url.includes('auth/login');
//         // اگر درخواست 401 باشد و از قبل در حال رفرش نباشد
//         if (status === 401 && !isLoginRequest && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 })
//                     .then((token) => {
//                         return apiRequest(originalRequest);
//                     })
//                     .catch((err) => {
//                         return Promise.reject(err);
//                     });
//             }
//
//             originalRequest._retry = true;
//             isRefreshing = true;
//
//             return new Promise((resolve, reject) => {
//                 axios.post(baseURL+ 'auth/refresh', {}, {
//                     withCredentials: true  // برای ارسال کوکی‌های HttpOnly
//                 })
//                     .then(({ data }) => {
//                         processQueue(null, data.accessToken);
//                         resolve(apiRequest(originalRequest));
//                     })
//                     .catch((err) => {
//                         processQueue(err, null);
//                         handleLogout();
//                         reject(err);
//                     })
//                     .finally(() => {
//                         isRefreshing = false;
//                     });
//             });
//         }
//
//         return Promise.reject(err);
//     }
// );
//
// // تابع خروج کاربر
// const handleLogout = () => {
//     window.location.href = "/login";
// };

export default apiRequest;
