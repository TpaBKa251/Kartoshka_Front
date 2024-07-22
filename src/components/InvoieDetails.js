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

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:8080/potato/api/invoices/${id}`);
                setInvoice(response.data);

                const senderResponse = await axiosInstance.get(`http://localhost:8080/potato/api/users/${response.data.senderId}`);
                setSender(senderResponse.data);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceDetails();
    }, [id]);

    const handleConfirmPayment = async () => {
        try {
            const response = await axiosInstance.post(`http://localhost:8080/potato/api/transfers/viainvoice`, {
                invoiceId: id
            });
            setInvoice({ ...invoice, status: 'PAID' });
            console.log('Payment response:', response.data); // Debugging line
            alert("Счет оплачен")
        } catch (error) {
            console.error('Failed to confirm payment:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    if (loading) {
        return <p>Загрузка...</p>;
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
