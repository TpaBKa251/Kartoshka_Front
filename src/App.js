// src/App.js

import React from 'react';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Transfer from './components/Transfer';
import Logout from './components/Logout';
import Home from './components/Home';
import Profile from './components/Profile';
import Balance from './components/Balance';
import TransactionHistory from './components/TransactionHistory';
import Invoices from './components/Invoices';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateInvoice from "./components/CreateInvoice";

function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <nav className="App-nav">
              <div className="logo">Картошка</div>
              <div className="nav-links">
                <Link to="/">Для покупок</Link>
                <Link to="/">Для бизнеса</Link>
              </div>
              <div className="auth-links">
                {!localStorage.getItem('sessionToken') ? (
                    <>
                      <Link to="/register">Регистрация</Link>
                      <Link to="/login">Войти</Link>
                    </>
                ) : (
                    <>
                      <Link to="/profile">Профиль</Link>
                      <Link to="/logout">Выйти</Link>
                    </>
                )}
              </div>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/transactions" element={<TransactionHistory />} />
              <Route path="/create-invoice" element={<CreateInvoice />} />
              <Route path="/invoices" element={<Invoices />} /> {/* Add this line */}
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;




