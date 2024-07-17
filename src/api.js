const API_URL = 'https://example.com/potato/api';

export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    return await response.json();
}

export async function loginUser(credentials) {
    const response = await fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    return await response.json();
}
