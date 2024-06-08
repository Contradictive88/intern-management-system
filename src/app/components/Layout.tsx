"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Read the initial state from localStorage or default to false
    const [isSidebarRetracted, setIsSidebarRetracted] = useState<boolean>(() => {
        const storedValue = typeof window !== "undefined" ? localStorage.getItem('isSidebarRetracted'): false;
        return storedValue ? JSON.parse(storedValue) : false;
    });

    // Save the state to localStorage whenever it changes
    useEffect(() => {
        typeof window !== "undefined" ? localStorage.setItem('isSidebarRetracted', JSON.stringify(isSidebarRetracted)): false;
    }, [isSidebarRetracted]);

    const toggleSidebar = () => {
        setIsSidebarRetracted(!isSidebarRetracted);
    };

    return (<>
        <div className="flex h-screen">
            <Sidebar isRetracted={isSidebarRetracted} />
            <div className="flex flex-col flex-1">
                <Header toggleSidebar={toggleSidebar} isRetracted={isSidebarRetracted} />
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    </>);
};

export default Layout;
