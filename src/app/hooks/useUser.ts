import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    role: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

export const useUser = () => {
    const [user, setUser] = useState<DecodedToken | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setUser(decodedToken);
        }
        setLoading(false);
    }, []);

    return { user, loading };
};