import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Switch from './Switch';

import featureImage1 from '../assets/images/modern_technologies.jpg';
import featureImage2 from '../assets/images/cool.jpg';
import featureImage3 from '../assets/images/support.jpg';
import logoImage from '../assets/images/potato.png';

// Загрузите изображения для баннеров
import bannerImage1 from '../assets/images/pay.jpg';
import bannerImage2 from '../assets/images/replenishment.jpg';

import actionImage1 from '../assets/images/transfer.png';
import actionImage2 from '../assets/images/invoice.png';
import actionImage3 from '../assets/images/topup.png';
import axiosInstance from "../axiosConfig";

const Home = () => {
    const isAuthenticated = !!localStorage.getItem('sessionToken');
    const navigate = useNavigate();
    const [walletInfo, setWalletInfo] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState(null);
    const [totalDebt, setTotalDebt] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [randomText, setRandomText] = useState('');

    const [activeTab, setActiveTab] = useState('transactions');

    const handleToggle = (tab) => {
        setActiveTab(tab);
    };

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

            const parallaxElements2 = document.querySelectorAll('.desktop .main-container');
            parallaxElements2.forEach(element => {
                const scrolled = window.scrollY;
                element.style.transform = `translateY(${scrolled * .3}px)`;
            });
        };

        if (isAuthenticated) {
            const fetchWalletInfo = async () => {
                try {
                    const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/wallet');
                    setWalletInfo(response.data);
                } catch (error) {
                    console.error('Failed to fetch wallet info:', error.response ? error.response.data : error.message);
                }
            };

            const fetchTransactions = async () => {
                try {
                    const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/transfers/getall');
                    if (response.data.length > 10) {
                        setTransactions(response.data.slice(response.data.length - 10, response.data.length));
                    }
                    else {
                        setTransactions(response.data.slice(0, 10));
                    }
                } catch (error) {
                    console.error('Failed to fetch transactions:', error.response ? error.response.data : error.message);
                }
            };

            const fetchInvoices = async () => {
                try {
                    const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/invoices/getallincoming');
                    if (response.data.length > 5) {
                        setInvoices(response.data.filter(invoice => invoice.invoiceStatus === 'UNPAID').slice(response.data.length - 5, response.data.length));
                    }
                    else {
                        setInvoices(response.data.filter(invoice => invoice.invoiceStatus === 'UNPAID').slice(0, 5));
                    }

                } catch (error) {
                    setError(error.response ? error.response.data : 'Сервер не отвечает. Попробуйте позже');
                }
            };

            const fetchProfile = async () => {
                try {
                    const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/users/profile');
                    setProfileData(response.data);
                } catch (error) {
                    console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
                }
            };

            const fetchTotalDebt = async () => {
                try {
                    const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/invoices/gettotal');
                    setTotalDebt(response.data);
                } catch (error) {
                    console.error('Error fetching total debt:', error.response ? error.response.data : error.message);
                }
            };


            setRandomText(getRandomMessage());
            fetchWalletInfo();
            fetchTransactions();
            fetchInvoices();
            fetchTotalDebt();
            fetchProfile();
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const handleViewInvoice = (invoiceId) => {
        navigate(`/invoices/${invoiceId}`);
    };

    if (walletInfo === null && isAuthenticated) {
        return <div align="center"><span className="spinner-page"></span> <p style={{fontSize: "1.3rem"}}>{randomText}</p></div>;
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
                            <p>Получите сразу после регистрации. Платите им в онлайне за услуги и товары или выставляйте
                                счета на оплату и получайте деньги на свой кошелек. А также бесплатно переводите
                                деньги.</p>
                            <button className="banner-button" onClick={() => navigate('/register')}>Зарегистрироваться
                            </button>
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
                            <p>А также рулетка. Можете без риска пополнить кошелек на желаемую сумму или попытать удачу
                                и получить во много раз больше.</p>
                            <button className="banner-button" onClick={() => navigate('/register')}>За кошельком
                            </button>
                        </div>
                        <img src={bannerImage2} alt="Banner 2"/>
                    </div>
                    <footer>
                        <div className="footer-container">
                            <div className="footer-links">
                                <a href="#">API Картошка</a>
                                <a href="#">Безопасность в интернете</a>
                                <a href="#">Юридическая информация</a>
                            </div>
                            <div className="footer-contact">
                                <p>+7 909 538-22-25</p>
                                <a href="#">Помощь</a>
                                <a href="#">Контакты</a>
                                <a href="#">Вакансии</a>
                                <a href="#">Картошка для бизнеса</a>
                            </div>
                            <div className="footer-bottom">
                                <div className="footer-logo">
                                    <img src={logoImage} alt="Logo"/>
                                    <a>© 2024 ИП «Илья Лапшин». Лицензия Банка России отсутствует</a>
                                </div>
                                <a href="#">Политика конфиденциальности</a>
                            </div>
                        </div>
                    </footer>

                </>
            ) : (
                <>
                    <div className="desktop">
                        <div className="greeting">
                            {profileData !== null && (
                                <h1 align='center'>Добро пожаловать, {profileData.firstName}</h1>
                            )}
                        </div>
                        <div className="main-container">
                            <div className="actions">
                                <div className="left-column">
                                    <div className="balance-container">
                                        <h1>Баланс</h1>
                                        <p>{walletInfo.amount.toLocaleString('ru-RU', {
                                            style: 'currency',
                                            currency: 'RUB'
                                        })}</p>
                                        {totalDebt !== null && (
                                            <h2>Задолженность: {totalDebt.toLocaleString('ru-RU', {
                                                style: 'currency',
                                                currency: 'RUB'
                                            })}</h2>
                                        )}
                                        <Link to="/topup">
                                            <button className="balance-button">Пополнить</button>
                                        </Link>
                                        <Link to="/balance">
                                            <button className="wallet-button">Кошелек</button>
                                        </Link>
                                    </div>
                                    <h1 style={{marginTop: '100px', fontSize: '2.5rem'}}>Последние события:</h1>
                                    <Switch onToggle={handleToggle} />
                                    {activeTab === 'transactions' ? (
                                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
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
                                        </div>
                                    ) : (
                                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                            <div className="invoice-container">
                                                <h2>Неоплаченные счета</h2>
                                                {invoices.length === 0 ? (
                                                    <p>Нет неоплаченных счетов.</p>
                                                ) : (
                                                    <ul className="invoice-list">
                                                        {invoices.map((invoice) => (
                                                            <li key={invoice.id} className="unpaid">
                                    <span>{invoice.amount.toLocaleString('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB'
                                    })}</span>
                                                                <button className="pay-button"
                                                                        onClick={() => handleViewInvoice(invoice.id)}>Оплатить
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                <Link to="/invoices">
                                                    <button className="view-all-button">Посмотреть все счета</button>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="right-column">
                                    <div className="transfer-banner small">
                                        <h2>Перевести</h2>
                                        <button className="transfer-button"
                                                onClick={() => navigate('/transfer/phone')}>По
                                            номеру телефона
                                        </button>
                                        <button className="transfer-button" onClick={() => navigate('/transfer/id')}>По
                                            ID
                                        </button>
                                        <button className="transfer-button"
                                                onClick={() => navigate('/transfer/invoice')}>По
                                            ID счета на оплату
                                        </button>
                                    </div>
                                    <div className="create-invoice-banner small">
                                        <h2>Создать счет на оплату</h2>
                                        <button className="create-invoice-button"
                                                onClick={() => navigate('/create-invoice')}>Создать
                                        </button>
                                    </div>
                                    <div className="topup-banner small">
                                        <h2>Пополнить</h2>
                                        <button className="topup-button"
                                                onClick={() => navigate('/topup')}>Hesoyam
                                        </button>
                                        <button className="topup-button"
                                                onClick={() => navigate('/roulette')}>Рулетка
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer>
                            <div className="footer-container">
                                <div className="footer-links">
                                    <a href="#">API Картошка</a>
                                    <a href="#">Безопасность в интернете</a>
                                    <a href="#">Юридическая информация</a>
                                </div>
                                <div className="footer-contact">
                                    <p>+7 909 538-22-25</p>
                                    <a href="#">Помощь</a>
                                    <a href="#">Контакты</a>
                                    <a href="#">Вакансии</a>
                                    <a href="#">Картошка для бизнеса</a>
                                </div>
                                <div className="footer-bottom">
                                    <div className="footer-logo">
                                        <img src={logoImage} alt="Logo"/>
                                        <a>© 2024 ИП «Илья Лапшин». Лицензия Банка России отсутствует</a>
                                    </div>
                                    <a href="#">Политика конфиденциальности</a>
                                </div>
                            </div>
                        </footer>
                    </div>


                    <div className="mobile">
                        <div className="profile-button">
                        </div>

                        <div className="main-container">
                            <div className="balance-container">
                                <h1>Баланс</h1>
                                <p>{walletInfo.amount.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB'
                                })}</p>
                                {totalDebt !== null && (
                                    <h2>Задолженность: {totalDebt.toLocaleString('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB'
                                    })}</h2>
                                )}
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


                        </div>
                        <footer>
                            <div className="footer-container">
                                <div className="footer-links">
                                    <a href="#">API Картошка</a>
                                    <a href="#">Безопасность в интернете</a>
                                    <a href="#">Юридическая информация</a>
                                </div>
                                <div className="footer-contact">
                                    <p>+7 909 538-22-25</p>
                                    <a href="#">Помощь</a>
                                    <a href="#">Контакты</a>
                                    <a href="#">Вакансии</a>
                                    <a href="#">Картошка для бизнеса</a>
                                </div>
                                <div className="footer-bottom">
                                    <div className="footer-logo">
                                        <img src={logoImage} alt="Logo"/>
                                        <a>© 2024 ИП «Илья Лапшин». Лицензия Банка России отсутствует</a>
                                    </div>
                                    <a href="#">Политика конфиденциальности</a>
                                </div>
                            </div>
                        </footer>

                        <div className="bottom-nav">
                            <button onClick={() => navigate('/')}>Главная</button>
                            <button onClick={() => navigate('/transfer')}>Переводы</button>
                            <button onClick={() => navigate('/invoices')}>Счета</button>
                            <button onClick={() => navigate('/topup')}>Пополнить</button>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default Home;
