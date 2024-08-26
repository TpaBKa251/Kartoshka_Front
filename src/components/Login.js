
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [randomText, setRandomText] = useState('');
    const navigate = useNavigate();

    const messages = [
        'Копаем картошку...',
        'Пожалуйста, подождите...',
        'Вспахиваем поле...',
        'Окучиваем картошку...',
        'Заводим трактор...',
        'Ищем место для посева...'
    ];

    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRandomText(getRandomMessage());
        try {
            let response;
            const isEmail = identifier.includes('@');

            if (isEmail) {
                response = await axios.post('https://shift-intensive-potato-wallet.onrender.com/potato/api/sessions/loginviaemail', {
                    email: identifier,
                    password,
                });
            } else {
                response = await axios.post('https://shift-intensive-potato-wallet.onrender.com/potato/api/sessions/loginviaphone', {
                    phone: identifier,
                    password,
                });
            }

            const { token, sessionId } = response.data;

            localStorage.setItem('sessionToken', token);
            localStorage.setItem('sessionId', sessionId);

            navigate('/');
            window.location.reload();

        } catch (error) {
            setError(error.response ? error.response.data : 'Сервер не отвечает, попробуйте позже');
        } finally {
            setLoading(false);
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
                <button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner"></span> {randomText}
                        </>
                    ) : (
                        'Войти'
                    )}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;




