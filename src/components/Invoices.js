import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import './Invoices.css';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [totalDebt, setTotalDebt] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/potato/api/invoices/getall');
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoices:', error.response ? error.response.data : error.message);
            }
        };

        fetchInvoices();
    }, []);

    const cancelInvoice = async (invoiceId) => {
        try {
            await axiosInstance.patch(`http://localhost:8080/potato/api/invoices/cancel/${invoiceId}`);
            setInvoices((prevInvoices) =>
                prevInvoices.map((invoice) =>
                    invoice.id === invoiceId ? { ...invoice, invoiceStatus: 'CANCELLED' } : invoice
                )
            );
        } catch (error) {
            console.error('Error cancelling invoice:', error.response ? error.response.data : error.message);
        }
    };

    const fetchTotalDebt = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:8080/potato/api/invoices/gettotal');
            setTotalDebt(response.data);
        } catch (error) {
            console.error('Error fetching total debt:', error.response ? error.response.data : error.message);
        }
    };

    const payInvoice = async (invoiceId) => {
        try {
            await axiosInstance.post('http://localhost:8080/potato/api/transfers/viainvoice', {invoiceId});
            setInvoices((prevInvoices) =>
                prevInvoices.map((invoice) =>
                    invoice.id === invoiceId ? { ...invoice, invoiceStatus: 'PAID' } : invoice
                )
            );
        } catch (error) {
            console.error('Error paying invoice:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="invoices-container">
            <h2>Ваши счета на оплату</h2>
            <div className="invoices-list">
                {invoices.map((invoice) => (
                    <div key={invoice.id} className="invoice-card">
                        <p><strong>ID счета:</strong> {invoice.id}</p>
                        <p><strong>Отправитель:</strong> {invoice.senderId}</p>
                        <p><strong>Получатель:</strong> {invoice.recipientId}</p>
                        <p><strong>Сумма:</strong> {invoice.amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}</p>
                        <p><strong>Статус:</strong> {invoice.invoiceStatus}</p>
                        <p><strong>Тип:</strong> {invoice.invoiceType}</p>
                        <p><strong>Дата создания:</strong> {new Date(invoice.invoiceDateTime).toLocaleString()}</p>
                        {invoice.comment && <p><strong>Комментарий:</strong> {invoice.comment}</p>}
                        {invoice.invoiceType === 'OUTGOING' && invoice.invoiceStatus === 'UNPAID' && (
                            <button onClick={() => cancelInvoice(invoice.id)} className="cancel-button">Отменить</button>
                        )}
                        {invoice.invoiceType === 'INCOMING' && invoice.invoiceStatus === 'UNPAID' && (
                            <button onClick={() => payInvoice(invoice.id)} className="pay-button">Оплатить</button>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={fetchTotalDebt} className="debt-button">Вывести общую задолженность</button>
            {totalDebt !== null && (
                <p className="total-debt">Общая задолженность: {totalDebt.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}</p>
            )}
        </div>
    );
};

export default Invoices;
