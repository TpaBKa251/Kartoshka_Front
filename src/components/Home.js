import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

import featureImage1 from '../assets/images/modern_technologies.jpg';
import featureImage2 from '../assets/images/cool.jpg';
import featureImage3 from '../assets/images/support.jpg';

// Загрузите изображения для баннеров
import bannerImage1 from '../assets/images/people.jpg'; // Убедитесь, что путь к изображению верен
import bannerImage2 from '../assets/images/pay.jpg'; // Убедитесь, что путь к изображению верен

const Home = () => {
    const isAuthenticated = !!localStorage.getItem('sessionToken');
    const navigate = useNavigate();

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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                <section className="actions">
                    <h2>Добро пожаловать в Картошку!</h2>
                    <Link to="/transfer">
                        <button className="action-button">Сделать перевод</button>
                    </Link>
                    <p className="action-description">Отправляйте деньги быстро и легко по номеру телефона, ID или
                        номеру счета.</p>
                    <Link to="/balance">
                        <button className="action-button">Проверить баланс</button>
                    </Link>
                    <p className="action-description">Просмотрите текущий баланс вашего кошелька.</p>
                    <Link to="/transactions">
                        <button className="action-button">История транзакций</button>
                    </Link>
                    <p className="action-description">Просматривайте все ваши прошлые транзакции в одном месте.</p>
                    <Link to="/create-invoice">
                        <button className="action-button">Создать счет</button>
                    </Link>
                    <p className="action-description">Создавайте счета и отправляйте их вашим клиентам и друзьям.</p>
                </section>
            )}
        </div>
    );
};

export default Home;
