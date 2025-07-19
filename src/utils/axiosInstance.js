import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './config';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
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