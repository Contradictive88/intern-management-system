"use client"
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type EditViewModeContextType = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const EditViewModeContext = createContext<EditViewModeContextType | undefined>(undefined);

type EditViewModeProviderProps = {
  children: ReactNode;
};

export const EditViewModeProvider: React.FC<EditViewModeProviderProps> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false); // Default to Editing Mode

  return (
    <EditViewModeContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </EditViewModeContext.Provider>
  );
};

export const useEditViewMode = (): EditViewModeContextType => {
  const context = useContext(EditViewModeContext);
  if (!context) {
    throw new Error('useEditViewMode must be used within a EditViewModeProvider');
  }
  return context;
};