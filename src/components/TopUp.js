// TopUp.js
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './TopUp.css';

const TopUp = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8080/potato/api/transfers/hesoyam', { amount });
            setMessage(response.data.result);
        } catch (error) {
            setMessage('Ошибка при пополнении.');
        }
    };

    return (
        <div className="topup-container">
            <h1>Пополнить кошелек</h1>
            <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Сумма"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                <button type="submit">Пополнить</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TopUp;
