import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-100 p-4 h-full">
            <nav>
                <ul>
                    <li><a href="/profile" className="block py-2">Profile</a></li>
                    <li><a href="/settings" className="block py-2">Settings</a></li>
                    <li><a href="/logout" className="block py-2">Logout</a></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
