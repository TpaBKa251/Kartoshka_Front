
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Transfer.css';

const TransferByInvoice = () => {
    const [invoiceId, setInvoiceId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('https://shift-intensive-potato-wallet.onrender.com/potato/api/transfers/viainvoice', { invoiceId });
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
            <h2>Перевод по ID счета на оплату</h2>
            <input
                type="text"
                placeholder="ID счета"
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
