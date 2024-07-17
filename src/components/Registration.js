// src/components/Registration.js

import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        birthDate: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('http://localhost:8080/potato/api/users', formData);
            console.log('Registration successful:', response.data);
            // Redirect or show a success message
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            setError('Registration failed. Please check your details and try again.');
        }

        window.location.reload();
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="birthDate"
                    placeholder="Birth Date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Registration;


