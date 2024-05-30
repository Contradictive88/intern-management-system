import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRedirectIfAuthenticated = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('token');
        if (token) {
            router.push('/profile');
        }
    }, [router]);
};

export default useRedirectIfAuthenticated;
