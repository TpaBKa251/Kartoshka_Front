// src/components/TransferByInvoice.js

import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Transfer.css';

const TransferByInvoice = () => {
    const [invoiceId, setInvoiceId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('http://localhost:8080/potato/api/transfers/viainvoice', { invoiceId });
            alert('Перевод успешно выполнен');
        } catch (error) {
            console.error('Transfer failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : 'Перевод не выполнен');
        }
    };

    return (
        <form className="transfer-form" onSubmit={handleSubmit}>
            <h2>Перевод по ID инвойса</h2>
            <input
                type="text"
                placeholder="ID инвойса"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                required
            />
            <button type="submit">Отправить</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default TransferByInvoice;
