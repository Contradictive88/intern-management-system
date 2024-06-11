import React from 'react';

// Define the props interface for the FlexibleInput component
interface DateInputProps {
  label: string;       // The text to display in the label
  inputName: string;   // The name attribute for the input field
  value?: string;      // The current value of the input field (optional)
  maxLength?: number;  // The maximum length for the input field (optional)
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler for the input's onChange event (optional)
}

/**
 * A flexible input component that can be used in various forms.
 * 
 * @param {DateInputProps} props - The properties for the component
 * @returns {JSX.Element} - The rendered component
 */
const DateInput: React.FC<DateInputProps> = ({ label, inputName, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={inputName} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        type="date"
        id={inputName}
        name={inputName}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DateInput;