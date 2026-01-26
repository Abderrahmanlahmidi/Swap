'use client';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Loading from '../layout/Loading';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, user, token } = useSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();
    const { fetchMe, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                if (pathname !== '/login' && pathname !== '/register') {
                    router.push('/login');
                }
                setIsLoading(false);
                return;
            }

            if (!user) {
                try {
                    await fetchMe();
                } catch (error) {
                    logout();
                    router.push('/login');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [token, user, pathname, router]);

    if (isLoading) {
        return <Loading />;
    }

    return children;
}

