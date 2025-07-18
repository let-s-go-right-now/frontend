import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'https://letsgorightnow.store/',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (!config.url.includes('api/member/join') && !config.url.includes('api/member/login')) {
            const token = await AsyncStorage.getItem('jwtToken');
            console.log("Token: ", token);
            if (token) {
                config.headers.Authorization = `${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;