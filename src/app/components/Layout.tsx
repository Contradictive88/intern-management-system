import React, { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarRetracted, setIsSidebarRetracted] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarRetracted(!isSidebarRetracted);
    };

    return (
        <div className="flex h-screen">
            <Sidebar isRetracted={isSidebarRetracted} />
            <div className="flex flex-col flex-1">
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
