import axios from 'axios';

const Instance = axios.create({
    // baseURL: "http://localhost:8086",
    baseURL: "https://shoe-fast-be-1.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

// Sử dụng interceptor để lấy token mỗi khi có yêu cầu
Instance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('token'); // Lấy token từ localStorage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Đảm bảo sử dụng đúng key 'Authorization'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default Instance;
