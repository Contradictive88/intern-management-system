import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, type = 'button', className, onClick, ...rest }) => {
  return (
    <button
      type={type}
      className={`bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-lg ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
