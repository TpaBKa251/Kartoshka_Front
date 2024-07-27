
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Registration.css';
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        birthDate: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('https://shift-intensive-potato-wallet.onrender.com/potato/api/users', formData);
            console.log('Registration successful:', response.data);
            setError('');
            setMessage('Вы зарегистрированы!')
            navigate('/login')
        } catch (error) {
            setError(error.response ? error.response.data : 'Регистраци провалена, сервер не отвечает. Попробуйте позже');
            setMessage('');
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="middleName"
                    placeholder="Отчество (если есть)"
                    value={formData.middleName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Номер телефона"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="birthDate"
                    placeholder="Дата рождения"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
                {error && <p className="error">{error}</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Registration;


