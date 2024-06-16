import React, { forwardRef } from 'react';

// Define the props interface for the SelectField component
interface SelectFieldProps {
  label: string;       // The text to display in the label
  inputName: string;   // The name attribute for the select field
  options: { value: string; label: string }[];   // The list of options to display in the select field
  placeholder?: string; // The placeholder text for the select field (optional)
  [x: string]: any; // To accept additional props such as `ref` from react-hook-form
}

/**
 * A flexible select component that can be used in various forms.
 * 
 * @param {SelectFieldProps} props - The properties for the component
 * @param {React.Ref} ref - The reference to the select element
 * @returns {JSX.Element} - The rendered component
 */
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>((props, ref) => {
  const { label, inputName, options, placeholder, ...rest } = props;

  return (
    <div className="mb-4">
      <label htmlFor={inputName} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        id={inputName}
        name={inputName}
        ref={ref}
        {...rest}
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
});

SelectField.displayName = 'SelectField';

export default SelectField;
