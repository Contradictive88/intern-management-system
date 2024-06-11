import React from 'react';

// Define the props interface for the SelectField component
interface SelectFieldProps {
  label: string;       // The text to display in the label
  inputName: string;   // The name attribute for the select field
  value?: string;      // The current value of the select field (optional)
  placeholder?: string;      // The current value of the placeholder (optional)
  options: { value: string; label: string }[];   // The list of options to display in the select field
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Event handler for the select's onChange event (optional)
}

/**
 * A flexible select component that can be used in various forms.
 * 
 * @param {SelectFieldProps} props - The properties for the component
 * @returns {JSX.Element} - The rendered component
 */
const SelectField: React.FC<SelectFieldProps> = ({ label, inputName, value, options, placeholder, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={inputName} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        id={inputName}
        name={inputName}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
