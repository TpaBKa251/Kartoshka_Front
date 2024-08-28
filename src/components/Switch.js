import React, { useState } from 'react';
import './Switch.css'; // Импортируем стили

const Switch = ({ onToggle }) => {
    const [activeTab, setActiveTab] = useState('transactions');

    const handleToggle = (tab) => {
        setActiveTab(tab);
        onToggle(tab);
    };

    return (
        <div className="switch-container">
            <div
                className={`switch-option ${activeTab === 'transactions' ? 'active' : ''}`}
                onClick={() => handleToggle('transactions')}
            >
                Переводы
            </div>
            <div
                className={`switch-option ${activeTab === 'invoices' ? 'active' : ''}`}
                onClick={() => handleToggle('invoices')}
            >
                Счета
            </div>
            <div className={`switch-slider ${activeTab}`} />
        </div>
    );
};

export default Switch;
