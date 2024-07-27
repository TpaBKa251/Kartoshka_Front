
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Import the configured Axios instance

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                // Perform the logout request
                await axiosInstance.patch('https://shift-intensive-potato-wallet.onrender.com/potato/api/sessions/logout');

                // Clear the token and session ID from local storage
                localStorage.removeItem('sessionToken');
                localStorage.removeItem('sessionId');

                // Redirect to the login page
                navigate('/login');
                window.location.reload();
            } catch (error) {
                console.error('Logout failed:', error.response ? error.response.data : error.message);
            }
        };

        logout();
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;



