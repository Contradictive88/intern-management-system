"use client"

import React, { useMemo } from 'react';
import { BiSolidUser, BiSolidTrophy, BiSolidCube } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'

interface SidebarProps {
    isRetracted: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isRetracted }) => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const memoizedSidebar = useMemo(() => (<>
        <aside className={`bg-gray-800 text-white h-full flex flex-col px-4 transition-all duration-300 ${isRetracted ? 'w-20' : 'w-64'}`}>
            <h2 className="font-semibold py-5 my-2 flex items-center justify-center">
                <BiSolidCube className={`${isRetracted ? 'text-4xl' : 'mr-2 text-5xl'}`} />
                {!isRetracted && <span>Intern Management System</span>}
            </h2>
            <nav className="flex-1">
                <ul className="mt-4">
                    <li
                        className={`flex items-center py-4 px-2 mb-2 rounded-md cursor-pointer ${isActive('/profile') ? 'bg-white text-gray-800' : ''}`}
                        onClick={() => router.push('/profile')}
                    >
                        <BiSolidUser className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">Profile</span>}
                    </li>
                    <li
                        className={`flex items-center py-4 px-2 mb-2 rounded-md cursor-pointer ${isActive('/dtr') ? 'bg-white text-gray-800' : ''}`}
                        onClick={() => router.push('/dtr')}
                    >
                        <RiPagesFill className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">DTR</span>}
                    </li>
                    <li
                        className={`flex items-center py-4 px-2 mb-2 rounded-md cursor-pointer ${isActive('/achievements') ? 'bg-white text-gray-800' : ''}`}
                        onClick={() => router.push('/achievements')}
                    >
                        <BiSolidTrophy className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">Achievements</span>}
                    </li>
                    <li
                        className={`flex items-center py-4 px-2 mb-2 rounded-md cursor-pointer ${isActive('/settings') ? 'bg-white text-gray-800' : ''}`}
                        onClick={() => router.push('/settings')}
                    >
                        <IoMdSettings className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">Settings</span>}
                    </li>
                </ul>
            </nav>
        </aside>
    </>), [isRetracted, pathname]);

    return memoizedSidebar;
};

export default Sidebar;