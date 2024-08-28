
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Balance.css';

const Balance = () => {
    const [walletInfo, setWalletInfo] = useState(null);
    const [randomText, setRandomText] = useState('');
    const messages = [
        'Копаем картошку...',
        'Пожалуйста, подождите...',
        'Вспахиваем поле...',
        'Окучиваем картошку...',
        'Заводим трактор...',
        'Загружаем картошку...',
        'Ищем место для посева...'
    ];

    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    };

    useEffect(() => {
        const fetchWalletInfo = async () => {
            try {
                const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/wallet');
                setWalletInfo(response.data);
            } catch (error) {
                console.error('Failed to fetch wallet info:', error.response ? error.response.data : error.message);
            }
        };

        setRandomText(getRandomMessage());
        fetchWalletInfo();
    }, []);

    if (walletInfo === null) {
        return <div align="center"><span className="spinner-page"></span> <p
            style={{fontSize: "1.3rem"}}>{randomText}</p></div>;
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


