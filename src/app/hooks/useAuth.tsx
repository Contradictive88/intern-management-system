import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    role: string;
    exp: number;
    user: {
        id: number;
        username: string;
        email: string;
    }
}

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        try {
            const decodedToken = jwtDecode(token) as DecodedToken;
            const currentTime = Math.floor(Date.now() / 1000);

            if (decodedToken.exp && decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                router.push('/');
            }
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            router.push('/');
        }
    }, [router]);
};

export default useAuth;
