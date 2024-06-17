"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCookie } from '../utils/cookies';

// Define the type for user data
export type UserData = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  username: string;
  email: string;
  recovery_email: string;
  phone_number: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

// Define a TypeScript interface for the context value
interface UserContextType {
  user: UserData | null;
  loading: boolean;
  error?: string | null;
  fetchUser: () => Promise<void>;
}

// Create a context with initial values
const initialContext: UserContextType = {
  user: null,
  loading: true,
  error: null,
  fetchUser: async () => {},
};

interface ApiResponse {
  success?: boolean;
  data?: {
    user?: UserData;
    token?: string;
  };
  message?: string;
  errors?: {
    error: string;
  }[];
}

// Create the context
export const UserContext = createContext<UserContextType>(initialContext);

// Define the provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const authToken = getCookie(document.cookie, 'auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data: UserData = await response.json();
        if (data) {
          setUser(data);
          setError(null);
        } else {
          setError('User data not found');
        }
      } else {
        const errorData: ApiResponse = await response.json();
        setError(errorData.message || 'Fetching user data failed. Please try again.');
      }
    } catch (error) {
      setError('Fetching user data failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Provide context value
  const contextValue: UserContextType = {
    user,
    loading,
    error,
    fetchUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Define the hook to consume the context
export const useUser = (): UserContextType => useContext(UserContext);
