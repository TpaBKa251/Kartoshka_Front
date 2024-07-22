// src/components/TransferByPhone.js

import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Transfer.css';

const TransferByPhone = () => {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('http://localhost:8080/potato/api/transfers/viaphone', { recipientPhone: phone, amount });
            alert('Перевод успешно выполнен');
            setError('');
        } catch (error) {
            console.error('Transfer failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : 'Перевод не выполнен');
        }
    };

    return (
        <form className="transfer-form" onSubmit={handleSubmit}>
            <h2>Перевод по номеру телефона</h2>
            <input
                type="text"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Сумма"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button type="submit">Отправить</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default TransferByPhone;
