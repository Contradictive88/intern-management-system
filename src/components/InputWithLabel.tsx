import React, { forwardRef } from 'react';

// Define the props interface for the InputWithLabel component
interface InputWithLabelProps {
  label: string;       // The text to display in the label
  inputType: string;   // The type of the input field (e.g., "text", "email", "password")
  inputName: string;   // The name attribute for the input field
  maxLength?: number;  // The maximum length for the input field (optional)
  [x: string]: any; // To accept additional props such as `ref` from react-hook-form
}

/**
 * A flexible input component that can be used in various forms.
 * 
 * @param {InputWithLabelProps} props - The properties for the component
 * @param {React.Ref} ref - The reference to the input element
 * @returns {JSX.Element} - The rendered component
 */
const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>((props, ref) => {
  const { label, inputType, inputName, maxLength, ...rest } = props;

  return (
    <div className="mb-4">
      <label htmlFor={inputName} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        type={inputType}
        id={inputName}
        name={inputName}
        maxLength={maxLength}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

InputWithLabel.displayName = 'InputWithLabel';

export default InputWithLabel;
