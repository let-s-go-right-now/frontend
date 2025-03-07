import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://letsgorightnow.shop/',
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt'); // JWT를 로컬 스토리지에서 가져옴
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // JWT를 요청 헤더에 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        // 로그인 성공 시 JWT를 로컬 스토리지에 저장
        if (response.data.isSuccess && response.headers.authorization) {
            const token = response.headers.authorization.split(' ')[1]; // "Bearer "를 제거하고 토큰만 추출
            localStorage.setItem('jwt', token); // 로컬 스토리지에 저장
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;