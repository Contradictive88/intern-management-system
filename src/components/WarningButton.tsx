import React, { ButtonHTMLAttributes } from 'react';

interface WarningButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const WarningButton: React.FC<WarningButtonProps> = ({ children, type = 'button', className, onClick, ...rest }) => {
  return (
    <button
      type={type}
      className={`bg-warning hover:warning-hover text-white font-bold rounded-2xl text-lg ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default WarningButton;
