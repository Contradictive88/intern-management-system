"use client"
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
  const [isSidebarRetracted, setIsSidebarRetracted] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarRetracted((prev) => !prev);
  };

  const value: SidebarContextValue = {
    isSidebarRetracted,
    toggleSidebar,
  };

  useEffect(() => {
    localStorage.setItem('isSidebarRetracted', JSON.stringify(isSidebarRetracted));
  }, [isSidebarRetracted]);

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