import React from 'react';
import { BiArrowToLeft, BiSolidUserCircle } from "react-icons/bi";

const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 p-7 text-center flex justify-between">
            <BiArrowToLeft className="text-4xl" />
            <div>
                <BiSolidUserCircle className="text-4xl" />
            </div>
        </header>
    );
};

export default Header;
