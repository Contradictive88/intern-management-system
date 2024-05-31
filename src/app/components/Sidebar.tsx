import React from 'react';
import { BiSolidUser, BiSolidTrophy, BiLogOut, BiSolidCube } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

interface SidebarProps {
    isRetracted: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isRetracted }) => {
    const handleNavigation = (href: string) => {
        window.location.href = href;
    };

    return (
        <aside className={`bg-gray-800 text-white h-full flex flex-col px-4 transition-all duration-300 ${isRetracted ? 'w-20' : 'w-64'}`}>
            <h2 className="font-semibold py-5 my-2 flex items-center justify-center">
                <BiSolidCube className={`${isRetracted ? 'text-4xl' : 'mr-2 text-5xl'}`} />
                {!isRetracted && <span>Intern Management System</span>}
            </h2>
            <nav className="flex-1">
                <ul className="mt-4">
                    <li className="flex items-center p-4 mb-2 rounded-md bg-white text-gray-800 cursor-pointer" onClick={() => handleNavigation('/profile')}>
                        <BiSolidUser className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">Profile</span>}
                    </li>
                    <li className="flex items-center p-4 mb-2 rounded-md cursor-pointer" onClick={() => handleNavigation('/report/daily')}>
                        <RiPagesFill className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">DTR</span>}
                    </li>
                    <li className="flex items-center p-4 mb-2 rounded-md cursor-pointer" onClick={() => handleNavigation('/achievements')}>
                        <BiSolidTrophy className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">Achievements</span>}
                    </li>
                    <li className="flex items-center p-4 mb-2 rounded-md cursor-pointer" onClick={() => handleNavigation('/settings')}>
                        <IoMdSettings className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                        {!isRetracted && <span className="block text-lg">Settings</span>}
                    </li>
                </ul>
            </nav>
            <ul className="border-t border-white mt-auto">
                <li className="flex items-center p-4 mb-2 rounded-md cursor-pointer" onClick={() => handleNavigation('/logout')}>
                    <BiLogOut className={`text-3xl ${isRetracted ? '' : 'mr-2'}`} />
                    {!isRetracted && <span className="block text-lg">Logout</span>}
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
