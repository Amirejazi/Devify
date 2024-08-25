import axios from "axios";

const apiRequests = axios.create({
    baseURL: "http://localhost:4000/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

apiRequests.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("authToken");
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (err) => {
        console.log("Err", err);
        return Promise.reject(err);
    }
);

apiRequests.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        const status = err.response.status;
        if (status === 409) {
            console.log('Conflict Error:', err.response.data);
            console.log('A user with this information already exists. Please try a different email or username.');
        }
        else if (status === 403) {
            // Coding
        } else if (status === 429) {
            // Coding
        } else if (status === 404) {
            // Coding
        } else if (status === 401) {
            // Navigate to login page
        }

        return Promise.reject(err);
    }
);

export default apiRequests;
