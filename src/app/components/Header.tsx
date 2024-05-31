import React from 'react';
import { BiArrowToLeft, BiSolidUserCircle } from "react-icons/bi";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-gray-100 p-7 text-center flex justify-between">
            <BiArrowToLeft className="text-4xl cursor-pointer" onClick={toggleSidebar} />
            <div>
                <BiSolidUserCircle className="text-4xl" />
            </div>
        </header>
    );
};

export default Header;
