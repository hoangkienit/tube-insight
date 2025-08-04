import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
    timeout: 500000
});


// 🟢 Interceptor request
api.interceptors.request.use(
    async (config) => {
        
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            throw new Error(error.response.data.message || "Error.")
        } else if (error.request) {
            throw new Error("Connection Error.");
        } else {
            throw new Error("System Error");
        }
    }
);

export default api;