import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setCookie, getCookie } from '../utils/cookies'; // Importing the cookie utility functions

// Define the type for the props expected by SidebarProvider
interface SidebarProviderProps {
  children: ReactNode;
}

// Define the type for the context value
interface SidebarContextValue {
  isSidebarRetracted: boolean;
  toggleSidebar: () => void;
}

// Create the context
const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

// Create the provider component
const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // Initialize the state based on cookie value or default value
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(() => {
    const storedValue = getCookie('isSidebarRetracted');
    return storedValue ? JSON.parse(storedValue) : true; // Change default value to true
  });

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarRetracted((prev) => {
      const newValue = !prev;
      // Update cookie
      setCookie('isSidebarRetracted', JSON.stringify(newValue));
      return newValue;
    });
  };

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
