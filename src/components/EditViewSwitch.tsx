"use client"
import React from 'react';
import { useEditViewMode } from '../context/EditViewModeContext'; // Adjust path as per your project structure

const EditViewSwitch: React.FC = () => {
  const { isEditing, setIsEditing } = useEditViewMode();

  // Function to handle the toggle change
  const handleToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex justify-end items-center py-3 px-5">
      <span className="text-md font-medium text-gray-700 mr-5">
        {isEditing ? 'Editing Mode' : 'Viewing Mode'}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          checked={isEditing} 
          onChange={handleToggle} 
          className="sr-only peer"
        />
        <div className="w-14 h-8 bg-purple-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600"></div>
      </label>
    </div>
  );
};

export default EditViewSwitch;