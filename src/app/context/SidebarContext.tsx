import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the context value
interface SidebarContextValue {
  isSidebarRetracted: boolean;
  toggleSidebar: () => void;
}

// Create the context
const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

// Define the type for the props expected by SidebarProvider
interface SidebarProviderProps {
  children: ReactNode;
}

// Create the provider component
const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // Initialize the state
  const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('isSidebarRetracted');
    return storedValue === 'true'; // Convert string to boolean
  });

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarRetracted(prev => {
      const newValue = !prev;
      // Update local storage
      localStorage.setItem('isSidebarRetracted', newValue.toString()); // Convert boolean to string
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
const useSidebar = (): SidebarContextValue => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default SidebarProvider;
export { useSidebar };
