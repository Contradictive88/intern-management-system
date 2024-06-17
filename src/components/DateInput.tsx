import React, { forwardRef } from 'react';

// Define the props interface for the DateInput component
interface DateInputProps {
  label: string;       // The text to display in the label
  inputName: string;   // The name attribute for the input field
  [x: string]: any; // To accept additional props such as `ref` from react-hook-form
}

/**
 * A flexible date input component that can be used in various forms.
 * 
 * @param {DateInputProps} props - The properties for the component
 * @param {React.Ref} ref - The reference to the input element
 * @returns {JSX.Element} - The rendered component
 */
const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
  const { label, inputName, ...rest } = props;

  return (
    <div className="mb-4">
      <label htmlFor={inputName} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        type="date"
        id={inputName}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
