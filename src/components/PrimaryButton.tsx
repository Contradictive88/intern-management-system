import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, type = 'button', className, onClick, ...rest }) => {
  return (
    <button
      type={type}
      className={`bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl text-lg ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
