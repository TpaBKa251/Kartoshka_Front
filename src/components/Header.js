import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Header.css';
import logoImage from '../assets/images/potato.png';

const Header = () => {
    const isAuthenticated = !!localStorage.getItem('sessionToken');
    const navigate = useNavigate();

    return (
        <div>
        {!isAuthenticated ? (
        <header className="header-hero">
            <div className="App-nav">
                <Link to="/" className="logo">
                    <img src={logoImage} alt="Logo" className="logo-image"/>
                    Картошка
                </Link>
                <div className="auth-links">
                    <Link to="/login" className="cta-button">Вход</Link>
                    <Link to="/register" className="cta-button">Регистрация</Link>
                </div>
            </div>
        </header>
    ) : (
        <header className="header-hero-d">
            <div className="App-nav">
                <Link to="/" className="logo">
                    <img src={logoImage} alt="Logo" className="logo-image"/>
                    Картошка
                </Link>
                <div className="auth-links">
                    <Link to="/logout" className="cta-button-d">Выход</Link>
                    <Link to="/profile" className="cta-button-d">Профиль</Link>
                </div>
            </div>
        </header>
    )
}
        </div>
)
    ;
};

export default Header;
