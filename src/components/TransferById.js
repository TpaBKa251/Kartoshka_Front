
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Transfer.css';

const TransferById = () => {
    const [recipientId, setRecipientId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('https://shift-intensive-potato-wallet.onrender.com/potato/api/transfers/viaid', { recipientId, amount });
            alert('Перевод успешно выполнен');
            setError('');
            window.location.reload();
        } catch (error) {
            console.error('Transfer failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : 'Сервер не отвечает. Попробуйте позже');
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
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default TransferById;
