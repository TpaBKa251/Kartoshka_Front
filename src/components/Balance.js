// src/components/Balance.js

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Balance.css';

const Balance = () => {
    const [walletInfo, setWalletInfo] = useState(null);

    useEffect(() => {
        const fetchWalletInfo = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/potato/api/wallet'); // Замените на ваш эндпоинт для получения информации о кошельке
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
            <p><strong>ID кошелька:</strong> {walletInfo.id}</p>
            <p><strong>Баланс:</strong> {walletInfo.amount}</p>
            <p><strong>Последнее обновление:</strong> {new Date(walletInfo.lastUpdate).toLocaleString()}</p>
        </div>
    );
};

export default Balance;


