import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './IvoiceDetails.css';

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sender, setSender] = useState(null);
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
        const fetchInvoiceDetails = async () => {
            try {
                const response = await axiosInstance.get(`https://shift-intensive-potato-wallet.onrender.com/potato/api/invoices/${id}`);
                setInvoice(response.data);

                const senderResponse = await axiosInstance.get(`https://shift-intensive-potato-wallet.onrender.com/potato/api/users/${response.data.senderId}`);
                setSender(senderResponse.data);
            } catch (error) {
                setError(error.response ? error.response.data : 'Сервер не отвечает. Попробуйте позже');
            } finally {
                setLoading(false);
            }
        };

        setRandomText(getRandomMessage);
        fetchInvoiceDetails();
    }, [id]);

    const handleConfirmPayment = async () => {
        try {
            const response = await axiosInstance.post(`https://shift-intensive-potato-wallet.onrender.com/potato/api/transfers/viainvoice`, {
                invoiceId: id
            });
            setInvoice({ ...invoice, status: 'PAID' });
            console.log('Payment response:', response.data);
            alert("Счет оплачен");
            setError('');
            window.location.reload();
        } catch (error) {
            console.error('Failed to confirm payment:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    if (loading) {
        return <div align="center"><span className="spinner-page"></span> <p
            style={{fontSize: "1.3rem"}}>{randomText}</p></div>;
    }


    return (
        <div className="invoice-details-container">
            <h1>Детали счета</h1>
            {invoice ? (
                <div className="invoice-details">
                    <p><strong>Сумма:</strong> {invoice.amount.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB'
                    })}</p>
                    <p><strong>Статус:</strong> {invoice.invoiceStatus}</p>
                    <p><strong>Тип:</strong> {invoice.invoiceType === 'INCOMING' ? 'Входящий' : 'Исходящий'}</p>
                    <p><strong>Отправитель (получатель
                        средств):</strong> {sender ? `${sender.lastName} ${sender.firstName} ${sender.middleName}` : 'Загрузка...'}
                    </p>
                    <p><strong>Комменатрий:</strong> {invoice.comment}</p>
                    {invoice.invoiceStatus === 'UNPAID' && (
                        <button className="confirm-payment-button" onClick={handleConfirmPayment}>Подтвердить
                            оплату</button>
                    )}
                    <Link to="/invoices">
                        <button className="back-button">Назад к счетам</button>
                    </Link>
                    {error && <p className="error">{error}</p>}
                </div>
            ) : (
                <p>Счет не найден.</p>
            )}
        </div>
    );
};

export default InvoiceDetails;
