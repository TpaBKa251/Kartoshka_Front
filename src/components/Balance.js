// src/components/Balance.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Balance.css';

const Balance = () => {
    const [walletInfo, setWalletInfo] = useState(null);

    useEffect(() => {
        const fetchWalletInfo = async () => {
            try {
                const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/wallet'); // Замените на ваш эндпоинт для получения информации о кошельке
                setWalletInfo(response.data);
            } catch (error) {
                console.error('Failed to fetch wallet info:', error.response ? error.response.data : error.message);
            }
        };

        fetchWalletInfo();
    }, []);

    if (walletInfo === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className="balance-container">
            <h2>Информация о кошельке</h2>
            <h2><strong>ID кошелька:</strong> {walletInfo.id}</h2>
            <h2><strong>Баланс:</strong> {walletInfo.amount.toLocaleString('ru-RU', {
                style: 'currency',
                currency: 'RUB'})}</h2>
            <h2><strong>Последнее обновление:</strong> {new Date(walletInfo.lastUpdate).toLocaleString()}</h2>
        </div>
    );
};

export default Balance;


