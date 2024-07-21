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
import CreateInvoice from './components/CreateInvoice';
import Header from './components/Header';
import InvoiceDetails from './components/InvoieDetails';
import TransferByPhone from "./components/TransferByPhone";
import TransferById from "./components/TransferById";
import TransferByInvoice from "./components/TransferByInvoice";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
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
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:id" element={<InvoiceDetails />} />
              <Route path="/transfer/phone" element={<TransferByPhone />} />
              <Route path="/transfer/invoice" element={<TransferByInvoice />} />
              <Route path="/transfer/id" element={<TransferById />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
