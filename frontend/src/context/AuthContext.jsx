// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('smartBasaiUser');
        const token = localStorage.getItem('smartBasaiToken');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            // Bind default validation headers globally across Axios instances
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password });
        if (res.data.success) {
            localStorage.setItem('smartBasaiToken', res.data.token);
            localStorage.setItem('smartBasaiUser', JSON.stringify(res.data.user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setUser(res.data.user);
        }
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('smartBasaiToken');
        localStorage.removeItem('smartBasaiUser');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};