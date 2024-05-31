import React from 'react';
import { BiSolidUser, BiSolidTrophy, BiLogOut,BiSolidCube } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white px-4 h-full flex flex-col">
            <h2 className="font-semibold py-5 my-2 flex items-center"><BiSolidCube className="mr-2 text-5xl" />Intern Management System</h2>
            <nav className="flex-1">
                <ul className="mt-4">
                    <li className="flex items-center p-4 mb-2 rounded-md bg-white text-gray-800">
                        <BiSolidUser className="mr-2 text-2xl" />
                        <a href="/profile" className="block text-lg">Profile</a>
                    </li>
                    <li className="flex items-center p-4 mb-2 rounded-md">
                        <RiPagesFill className="mr-2 text-2xl" />
                        <a href="/report/daily" className="block text-lg">DTR</a>
                    </li>
                    <li className="flex items-center p-4 mb-2 rounded-md">
                        <BiSolidTrophy className="mr-2 text-2xl" />
                        <a href="/achievements" className="block text-lg">Achievements</a>
                    </li>
                    <li className="flex items-center p-4 mb-2 rounded-md">
                        <IoMdSettings className="mr-2 text-2xl" />
                        <a href="/settings" className="block text-lg">Settings</a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
