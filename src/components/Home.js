// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const isAuthenticated = !!localStorage.getItem('sessionToken');

    return (
        <div className="home-container">
            {!isAuthenticated ? (
                <>
                    <section className="hero">
                        <h1>Картошка: Ваш виртуальный кошелек</h1>
                        <Link to="/register">
                            <button className="cta-button">Зарегистрироваться</button>
                        </Link>
                    </section>
                    <section className="features">
                        <h2>Ваше личное финансовое пространство</h2>
                        <div className="feature-cards">
                            <div className="feature-card">
                                <h3>Без назойливых звонков с кредитами</h3>
                                <p>Телефон нужен только для регистрации и подтверждения платежей</p>
                            </div>
                            <div className="feature-card">
                                <h3>Можно без паспорта</h3>
                                <p>Зарегистрируйтесь и сразу пользуйтесь бесплатным виртуальным кошельком</p>
                            </div>
                            <div className="feature-card">
                                <h3>Безопасно</h3>
                                <p>Откройте цифровой кошелек в Картошке — это бесплатно и безопасно</p>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <section className="actions">
                    <h2>Добро пожаловать в Картошку!</h2>
                    <Link to="/transfer">
                        <button className="action-button">Сделать перевод</button>
                    </Link>
                    <p className="action-description">Отправляйте деньги быстро и легко по номеру телефона, ID или номеру счета.</p>
                    <Link to="/balance">
                        <button className="action-button">Проверить баланс</button>
                    </Link>
                    <p className="action-description">Просмотрите текущий баланс вашего кошелька.</p>
                    <Link to="/transactions">
                        <button className="action-button">История транзакций</button>
                    </Link>
                    <p className="action-description">Просматривайте все ваши прошлые транзакции в одном месте.</p>
                    <Link to="/create-invoice">
                        <button className="action-button">Создать счет на оплату</button>
                    </Link>
                    <p className="action-description">Создайте новый счет на оплату для получения денег.</p>
                    <Link to="/invoices">
                        <button className="action-button">Просмотреть счета на оплату</button>
                    </Link>
                    <p className="action-description">Просматривайте и управляйте вашими счетами на оплату.</p>
                </section>
            )}
        </div>
    );
};

export default Home;







