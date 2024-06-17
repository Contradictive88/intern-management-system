import React from 'react';

interface DisplayFieldProps {
  label: string;
  value: string;
}

const DisplayField: React.FC<DisplayFieldProps> = ({ label, value }) => {
  return (
    <span>
      <label className="font-bold text-lg">{label}</label>
      <div className="p-2 w-full my-3 ml-3">{value}</div>
    </span>
  );
};

export default DisplayField;