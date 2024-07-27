
import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Roulette.css';

const Roulette = () => {
    const [amount, setAmount] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`https://shift-intensive-potato-wallet.onrender.com/potato/api/transfers/roulette/${min}/${max}/${number}`, { amount });
            setMessage(response.data.result);
        } catch (error) {
            setMessage('Ошибка при совершении ставки.');
        }
    };

    return (
        <div className="roulette-container">
            <h1>Рулетка</h1>
            <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={amount}
                        placeholder="Сумма"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        value={min}
                        placeholder="Минимум"
                        onChange={(e) => setMin(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Максимум"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Число"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                <button type="submit">Сделать ставку</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Roulette;
