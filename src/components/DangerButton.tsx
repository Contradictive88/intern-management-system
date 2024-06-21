import React, { ButtonHTMLAttributes } from 'react';

interface DangerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
}

const DangerButton: React.FC<DangerButtonProps> = ({ children, type = 'button', className, onClick, ...rest }) => {
  return (
    <button
      type={type}
      className={`bg-danger hover:danger-hover text-white font-bold rounded-2xl text-lg ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DangerButton;
