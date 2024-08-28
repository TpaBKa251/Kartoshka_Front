
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import './TransactionHistory.css';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/transfers/getall');
                setTransactions(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data : 'Сервер не отвечает. Попробуйте позже');
                setLoading(false);
            }

        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className="transaction-history-container">
            <h2>История транзакций</h2>
            <table className="transaction-table">
                <thead>
                <tr>
                    <th>ID транзакции</th>
                    <th>ID отправителя</th>
                    <th>ID получателя</th>
                    <th>Телефон получателя</th>
                    <th>ID инвойса</th>
                    <th>Сумма</th>
                    <th>Дата перевода</th>
                    <th>Статус перевода</th>
                    <th>Тип перевода</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.senderId}</td>
                        <td>{transaction.recipientId}</td>
                        <td>{transaction.recipientPhone}</td>
                        <td>{transaction.invoiceId}</td>
                        <td>{transaction.amount}</td>
                        <td>{new Date(transaction.transferDateTime).toLocaleString()}</td>
                        <td>{transaction.transferStatus}</td>
                        <td>{transaction.transferType}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;

