import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/axios';
import { useDispatch } from 'react-redux';
import { setCredentials, logout, updateUser } from '@/lib/redux/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        },
        onSuccess: async (data) => {
            const tempUser = {
                id: data.userId,
                role: data.role,
            };
            dispatch(setCredentials({ user: tempUser, accessToken: data.accessToken }));

            try {
                const response = await api.get('/auth/me');
                dispatch(updateUser(response.data));
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        },

    });


    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData);
            return response.data;
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: async (data) => {
            const response = await api.patch('/auth/profile', data);
            return response.data;
        },
        onSuccess: (data) => {
            dispatch(updateUser(data));
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: async (data) => {
            const response = await api.patch('/auth/change-password', data);
            return response.data;
        },
    });

    const fetchMe = async () => {
        const response = await api.get('/auth/me');
        return response.data;
    };

    const handleLogout = () => {
        dispatch(logout());
        queryClient.clear();
    };

    return {
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        updateProfile: updateProfileMutation.mutateAsync,
        isUpdating: updateProfileMutation.isPending,
        changePassword: changePasswordMutation.mutateAsync,
        isChangingPassword: changePasswordMutation.isPending,
        fetchMe,
        logout: handleLogout,
    };
};
