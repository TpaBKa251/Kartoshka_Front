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
                const response = await axiosInstance.get('http://localhost:8080/potato/api/users/profile'); // предполагается, что у вас есть соответствующий эндпоинт
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
                    <p><strong>Wallet ID:</strong> {profileData.walletId}</p>
                    <p><strong>First Name:</strong> {profileData.firstName}</p>
                    <p><strong>Last Name:</strong> {profileData.lastName}</p>
                    <p><strong>Middle Name:</strong> {profileData.middleName}</p>
                    <p><strong>Full Name:</strong> {profileData.fullName}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Phone:</strong> {profileData.phone}</p>
                    <p><strong>Registration Date:</strong> {profileData.registrationDate}</p>
                    <p><strong>Last Update Date:</strong> {profileData.lastUpdateDate}</p>
                    <p><strong>Birth Date:</strong> {profileData.birthDate}</p>
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


