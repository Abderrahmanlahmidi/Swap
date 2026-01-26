import { createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initializeAuth: (state) => {
            if (typeof window !== 'undefined') {
                const user = localStorage.getItem('user');
                const token = getCookie('accessToken');
                if (user && token) {
                    state.user = JSON.parse(user);
                    state.token = token;
                    state.isAuthenticated = true;
                }
                state.isInitialized = true;
            }
        },
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.isAuthenticated = true;
            state.isInitialized = true;
            if (accessToken) {
                setCookie('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
            }
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('role', user.role || '');
                localStorage.setItem('userId', user.id || '');
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isInitialized = true;
            deleteCookie('accessToken');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.user));
            if (action.payload.role) localStorage.setItem('role', action.payload.role);
            if (action.payload.id) localStorage.setItem('userId', action.payload.id);
        },
    },
});

export const { setCredentials, logout, updateUser, initializeAuth } = authSlice.actions;
export default authSlice.reducer;


