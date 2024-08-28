import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://shift-intensive-potato-wallet.onrender.com/potato/api',
});
const navigate = useNavigate();


axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('sessionToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Если код 401, удаляем токен и перенаправляем пользователя на страницу входа
            localStorage.removeItem('sessionToken');

            // Если вы используете React Router, перенаправьте пользователя
            navigate('/login') // или используйте useNavigate
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
