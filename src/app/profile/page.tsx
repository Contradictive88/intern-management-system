"use client";

export default function Profile() {
    const handleLogout = () => {
      window.location.href = '/';
    };

    return (
        <>
            <span>Hello World</span>
            <button onClick={handleLogout} className="block mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                Logout
            </button>
        </>
    );
}
