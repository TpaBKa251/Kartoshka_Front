// src/components/TransferById.js

import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Transfer.css';

const TransferById = () => {
    const [recipientId, setRecipientId] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('http://localhost:8080/potato/api/transfers/viaid', { recipientId, amount });
            alert('Перевод успешно выполнен');
        } catch (error) {
            console.error('Transfer failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form className="transfer-form" onSubmit={handleSubmit}>
            <h2>Перевод по ID пользователя</h2>
            <input
                type="text"
                placeholder="ID пользователя"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
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
        </form>
    );
};

export default TransferById;
