// src/components/CreateInvoice.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './CreateInvoice.css';

const CreateInvoice = () => {
    const [recipientId, setRecipientId] = useState('');
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('http://localhost:8080/potato/api/invoices', { recipientId, amount, comment });
            navigate('/');
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="create-invoice-container">
            <h2>Создать счет на оплату</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    ID получателя:
                    <input
                        type="text"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Сумма:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Комментарий (необязательно):
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default CreateInvoice;
