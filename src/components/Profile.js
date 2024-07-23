// src/components/Profile.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import EditProfile from './EditProfile';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('https://shift-intensive-potato-wallet.onrender.com/potato/api/users/profile'); // предполагается, что у вас есть соответствующий эндпоинт
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
            }
        };

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleEditClose = () => {
        setShowEditModal(false);
    };

    return (
        <div className="profile-container">
            {profileData ? (
                <div className="profile-info">
                    <h2>Профиль пользователя</h2>
                    <p><strong>ID:</strong> {profileData.id}</p>
                    <p><strong>ID кошелька:</strong> {profileData.walletId}</p>
                    <p><strong>Имя:</strong> {profileData.firstName}</p>
                    <p><strong>Фамилия:</strong> {profileData.lastName}</p>
                    <p><strong>Отчество:</strong> {profileData.middleName}</p>
                    <p><strong>Полное имя:</strong> {profileData.fullName}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Номер телефона:</strong> {profileData.phone}</p>
                    <p><strong>Дата регистрации:</strong> {new Date(profileData.registrationDate).toLocaleString()}</p>
                    <p><strong>Дата последнего обновления:</strong> {new Date(profileData.lastUpdateDate).toLocaleString()}</p>
                    <p><strong>Дата рождения:</strong> {new Date(profileData.birthDate).toLocaleDateString()}</p>
                    <button onClick={handleEditClick}>Редактировать профиль</button>
                </div>
            ) : (
                <p>Загрузка профиля...</p>
            )}
            {showEditModal && <EditProfile onClose={handleEditClose} profileData={profileData} />}
        </div>
    );
};

export default Profile;


