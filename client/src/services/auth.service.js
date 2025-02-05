import { API_URL } from '../utils/api';

const createDefaultAvatar = async (firstName, lastName) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#4fd1c5';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = 'white';
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
    ctx.fillText(initials, 100, 100);

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(new File([blob], 'avatar.png', { type: 'image/png' }));
        }, 'image/png');
    });
};

export const authService = {
    login: async (email, password) => {
        const response = await fetch(
            `${API_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ email, password })
            }
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }
        return data.data;
    },

    register: async (userData) => {
        const avatarFile = await createDefaultAvatar(userData.firstName, userData.lastName);
        const form = new FormData();
        Object.keys(userData).forEach(key => {
            form.append(key, userData[key]);
        });
        form.append('avatar', avatarFile);

        const response = await fetch(
            `${API_URL}/api/auth/signup`,
            {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                body: form
            }
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        return data.data;
    }
};

