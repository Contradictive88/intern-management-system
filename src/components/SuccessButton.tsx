import React, { ButtonHTMLAttributes } from 'react';

interface SuccessButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const SuccessButton: React.FC<SuccessButtonProps> = ({ children, type = 'button', className, onClick, ...rest }) => {
  return (
    <button
      type={type}
      className={`bg-success hover:success-hover text-white font-bold rounded-2xl text-lg ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SuccessButton;
