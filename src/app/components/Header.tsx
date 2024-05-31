import React from 'react';
import { BiArrowToLeft, BiArrowToRight, BiSolidUserCircle } from "react-icons/bi";

interface HeaderProps {
    toggleSidebar: () => void;
    isRetracted: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isRetracted }) => {
    return (
        <header className="bg-gray-100 p-7 text-center flex justify-between">
            {isRetracted ? (
                <BiArrowToRight className="text-4xl cursor-pointer" onClick={toggleSidebar} />
            ) : (
                <BiArrowToLeft className="text-4xl cursor-pointer" onClick={toggleSidebar} />
            )}
            <div>
                <BiSolidUserCircle className="text-4xl" />
            </div>
        </header>
    );
};

export default Header;
