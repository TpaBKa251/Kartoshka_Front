
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
            await axiosInstance.post('https://shift-intensive-potato-wallet.onrender.com/potato/api/invoices', { recipientId, amount, comment });
            navigate('/');
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="create-invoice-container">
            <h2>Создать счет на оплату</h2>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={recipientId}
                        placeholder="ID получателя"
                        onChange={(e) => setRecipientId(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        value={amount}
                        placeholder="Сумма"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        value={comment}
                        placeholder="Комментарий (опционально)"
                        onChange={(e) => setComment(e.target.value)}
                    />
                <button type="submit">Создать</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default CreateInvoice;
