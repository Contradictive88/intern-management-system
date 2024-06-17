import React from 'react';

interface DisplayFieldProps {
  label: string;
  value: string;
}

const DisplayField: React.FC<DisplayFieldProps> = ({ label, value }) => {
  return (
    <span>
      <label>{label}</label>
      <div className="p-2 w-full">{value}</div>
    </span>
  );
};

export default DisplayField;