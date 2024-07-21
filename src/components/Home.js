import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

import featureImage1 from '../assets/images/modern_technologies.jpg';
import featureImage2 from '../assets/images/cool.jpg';
import featureImage3 from '../assets/images/support.jpg';

// Загрузите изображения для баннеров
import bannerImage1 from '../assets/images/people.jpg'; // Убедитесь, что путь к изображению верен
import bannerImage2 from '../assets/images/pay.jpg';
import axiosInstance from "../axiosConfig"; // Убедитесь, что путь к изображению верен

const Home = () => {
    const isAuthenticated = !!localStorage.getItem('sessionToken');
    const navigate = useNavigate();
    const [walletInfo, setWalletInfo] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.info-section, .banner');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    section.classList.add('visible');
                } else {
                    //section.classList.remove('visible');
                }
            });
        };

        if (isAuthenticated) {
            const fetchWalletInfo = async () => {
                try {
                    const response = await axiosInstance.get('http://localhost:8080/potato/api/wallet'); // Замените на ваш эндпоинт для получения информации о кошельке
                    setWalletInfo(response.data);
                } catch (error) {
                    console.error('Failed to fetch wallet info:', error.response ? error.response.data : error.message);
                }
            };

            const fetchTransactions = async () => {
                try {
                    const response = await axiosInstance.get('http://localhost:8080/potato/api/transfers/getall');
                    setTransactions(response.data.slice(0, 10));
                } catch (error) {
                    console.error('Failed to fetch transactions:', error.response ? error.response.data : error.message);
                }
            };

            fetchWalletInfo();
            fetchTransactions()
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (walletInfo === null && isAuthenticated) {
        return <p>Loading...</p>;
    }

    const formatAmount = (amount, type, status) => {
        const formattedAmount = Math.abs(amount).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
        if (status === 'SUCCESSFUL') {
            return type === 'REPLENISHMENT' ? `+${formattedAmount}` : `-${formattedAmount}`;
        } else {
            return `${formattedAmount} (неуспешно)`;
        }
    };

    const getTransactionClassName = (type, status) => {
        let className = '';
        if (status === 'SUCCESSFUL') {
            className = 'successful';
            if (type === 'REPLENISHMENT') {
                className += ' replenishment';
            } else if (type === 'TRANSFER') {
                className += ' transfer';
            } else if (type === 'PAYMENT') {
                className += ' payment';
            }
        } else {
            className = 'failed';
            if (type === 'REPLENISHMENT') {
                className += ' replenishment';
            } else if (type === 'TRANSFER') {
                className += ' transfer';
            } else if (type === 'PAYMENT') {
                className += ' payment';
            }
        }
        return className;
    };

    return (
        <div className="home-container">
            {!isAuthenticated ? (
                <>
                    <header className="header-hero-dub">
                        <h1>Картошка: Ваш виртуальный кошелек</h1>
                        <p>Удобно, быстро и безопасно управляйте вашими финансами.</p>
                        <Link to="/register">
                            <button className="cta-button">Зарегистрироваться</button>
                        </Link>
                    </header>
                    <section className="features">
                        <h2>Ваше личное финансовое пространство</h2>
                        <div className="feature-cards">
                            <div className="feature-card">
                                <h3>Без назойливых звонков с кредитами</h3>
                                <p>Телефон нужен только для регистрации и подтверждения платежей.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Можно без паспорта</h3>
                                <p>Зарегистрируйтесь и сразу пользуйтесь бесплатным виртуальным кошельком.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Безопасно</h3>
                                <p>Откройте цифровой кошелек в Картошке — это бесплатно и безопасно.</p>
                            </div>
                        </div>
                    </section>

                    <div className="banner">
                        <div className="banner-content">
                            <h3>Кошелёк Картошка</h3>
                            <p>Получите сразу после регистрации. Платите им в онлайне за услуги и товары или выставляйте счета на оплату и получайте деньги на свой кошелек. А также бесплатно переводите деньги.</p>
                            <button className="banner-button" onClick={() => navigate('/register')}>Зарегистрироваться</button>
                        </div>
                        <img src={bannerImage1} alt="Banner 1"/>
                    </div>
                    <section className="info-sections">
                        <div className="info-section">
                            <img src={featureImage1} alt="Feature 1"/>
                            <div className="text">
                                <h3>Современные технологии</h3>
                                <p>Мы используем передовые технологии для обеспечения безопасности и удобства наших
                                    пользователей.</p>
                            </div>
                        </div>
                        <div className="info-section">
                            <img src={featureImage2} alt="Feature 2"/>
                            <div className="text">
                                <h3>Удобство использования</h3>
                                <p>Наш интерфейс интуитивно понятен и прост в использовании, чтобы вы могли управлять
                                    финансами без лишних усилий.</p>
                            </div>
                        </div>
                        <div className="info-section">
                            <img src={featureImage3} alt="Feature 3"/>
                            <div className="text">
                                <h3>Круглосуточная поддержка</h3>
                                <p>Наша команда поддержки всегда готова помочь вам с любыми вопросами и проблемами.</p>
                            </div>
                        </div>
                    </section>
                    <div className="banner">
                        <div className="banner-content">
                            <h3>Экслюзивная функция Hesoyam</h3>
                            <p>А также рулетка. Можете без риска пополнить кошелек на желаемую сумму или попытать удачу и получить во много раз больше.</p>
                            <button className="banner-button" onClick={() => navigate('/register')}>За кошельком</button>
                        </div>
                        <img src={bannerImage2} alt="Banner 2"/>
                    </div>
                </>
            ) : (
                <>
                    <section className="actions">
                        <div className="balance-container">
                            <h1>Баланс</h1>
                            <p>{walletInfo.amount.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB'})}</p>
                            <Link to="/topup">
                                <button className="balance-button">Пополнить</button>
                            </Link>
                            <Link to="/balance">
                                <button className="wallet-button">Кошелек</button>
                            </Link>

                        </div>
                        <div className="transaction-history">
                            <h2>История переводов</h2>
                            <ul>
                                {transactions.map((transaction) => (
                                    <li key={transaction.id}
                                        className={getTransactionClassName(transaction.transferType, transaction.transferStatus)}>
                                        <span>{transaction.transferType === 'REPLENISHMENT' ? 'Пополнение' : (transaction.transferType === 'TRANSFER' ? 'Перевод' : 'Платеж')}:</span>
                                        <span>{formatAmount(transaction.amount, transaction.transferType, transaction.transferStatus)}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/transactions">
                                <button className="view-all-button">Посмотреть все переводы</button>
                            </Link>
                        </div>
                    </section>

                </>
            )}
        </div>
    );
};

export default Home;
