
import React, { useState } from 'react';
import TransferByPhone from './TransferByPhone';
import TransferById from './TransferById';
import TransferByInvoice from './TransferByInvoice';
import './Transfer.css';

const Transfer = () => {
    const [transferType, setTransferType] = useState(null);

    const handleTransferTypeChange = (type) => {
        setTransferType(type);
    };

    return (
        <div className="transfer-container">
            {!transferType ? (
                <div className="transfer-menu">
                    <h2>Выберите тип перевода</h2>
                    <button onClick={() => handleTransferTypeChange('phone')}>По номеру телефона</button>
                    <button onClick={() => handleTransferTypeChange('id')}>По ID пользователя</button>
                    <button onClick={() => handleTransferTypeChange('invoice')}>По ID инвойса</button>
                </div>
            ) : (
                <>
                    {transferType === 'phone' && <TransferByPhone />}
                    {transferType === 'id' && <TransferById />}
                    {transferType === 'invoice' && <TransferByInvoice />}
                </>
            )}
        </div>
    );
};

export default Transfer;


