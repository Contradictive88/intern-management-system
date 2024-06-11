import React from 'react';
import InputWithLabel from '../InputWithLabel';

/**
 * A form component for capturing contact details.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const ContactDetailsForm: React.FC = () => {
  return (
    <div className="grid grid-cols-1 rounded-lg shadow-lg border m-4 p-4">
      <span className="text-3xl font-bold text-center mb-4">Contact Details</span>
      <form className="grid grid-cols-3 gap-x-5">
        <InputWithLabel 
          label="Email Address"
          inputType="email"
          inputName="emailAddress"
          maxLength={255}
        />
        <InputWithLabel 
          label="Recovery Email"
          inputType="email"
          inputName="recoveryEmail"
          maxLength={255}
        />
        <InputWithLabel 
          label="Phone Number"
          inputType="text"
          inputName="phoneNumber"
          maxLength={13}
        />
        <InputWithLabel 
          label="Emergency Contact Name"
          inputType="text"
          inputName="emergencyContactName"
          maxLength={255}
        />
        <InputWithLabel 
          label="Emergency Contact Number"
          inputType="text"
          inputName="emergencyContactNumber"
          maxLength={13}
        />
      </form>
    </div>
  );
};

export default ContactDetailsForm;
