"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the type for the context value
interface SidebarContextValue {
  isSidebarRetracted: boolean;
  toggleSidebar: () => void;
}

// Create the context
const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

// Define the type for the provider props
interface SidebarProviderProps {
  children: ReactNode;
}

// Create the provider component
const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // Initialize the state based on localStorage value
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Retrieve the stored value from localStorage
      const storedValue = localStorage.getItem('isSidebarRetracted');
      return storedValue !== null ? JSON.parse(storedValue) : false;
    }
    return false; // Default value when localStorage is not available
  });

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarRetracted((prev) => !prev);
  };

  // Store the current state in localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('isSidebarRetracted', JSON.stringify(isSidebarRetracted));
    }
  }, [isSidebarRetracted]);

  // Context value to be provided to the children components
  const value: SidebarContextValue = {
    isSidebarRetracted,
    toggleSidebar,
  };

  // Render the context provider with the provided value
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

// Create a custom hook to access the context value
const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default SidebarProvider;
export { useSidebar };
