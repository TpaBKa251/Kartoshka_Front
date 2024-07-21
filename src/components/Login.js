// src/components/Login.js

// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            const isEmail = identifier.includes('@');

            if (isEmail) {
                response = await axios.post('http://localhost:8080/potato/api/sessions/loginviaemail', {
                    email: identifier,
                    password,
                });
            } else {
                response = await axios.post('http://localhost:8080/potato/api/sessions/loginviaphone', {
                    phone: identifier,
                    password,
                });
            }

            const { token, sessionId } = response.data;

            // Save the token and session ID to local storage
            localStorage.setItem('sessionToken', token);
            localStorage.setItem('sessionId', sessionId);

            // Redirect to the homepage or another secure page
            navigate('/');

        } catch (error) {
            setError(error.response ? error.response.data : 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Вход</h2>
                <input
                    type="text"
                    placeholder="Email или номер телефона"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;




