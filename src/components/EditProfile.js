// src/components/EditProfile.js

import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './EditProfile.css';

const EditProfile = ({ onClose, profileData }) => {
    const [formData, setFormData] = useState({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        middleName: profileData.middleName || '',
        birthDate: profileData.birthDate || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.patch('http://localhost:8080/potato/api/users/edit', formData); // предполагается, что у вас есть соответствующий эндпоинт
            alert('Профиль успешно обновлен');
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
        }

        window.location.reload();
    };

    return (
        <div className="edit-profile-modal">
            <div className="edit-profile-content">
                <h2>Редактировать профиль</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Имя"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Фамилия"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="middleName"
                        placeholder="Отчество"
                        value={formData.middleName}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="birthDate"
                        placeholder="Дата рождения"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
