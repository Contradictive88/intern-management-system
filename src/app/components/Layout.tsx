"use client";
import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SidebarContextProvider from '../context/SidebarContext';
import { UserProvider } from '../context/UserContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <SidebarContextProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-4 overflow-auto">{children}</main>
          </div>
        </div>
      </SidebarContextProvider>
    </UserProvider>
  );
};

export default Layout;
