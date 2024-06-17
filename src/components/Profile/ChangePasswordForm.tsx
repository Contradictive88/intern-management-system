import React from 'react';
import InputWithLabel from '../InputWithLabel';
import PrimaryButton from '../PrimaryButton';

/**
 * A form component for changing the password.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const ChangePasswordForm: React.FC = () => {
  return (
    <div className="grid grid-cols-1 rounded-lg shadow-lg border m-4 p-4">
      <span className="text-3xl font-bold text-center mb-4">Change Password</span>
      <form className="grid grid-cols-1 gap-x-5">
        <InputWithLabel 
          label="Old Password"
          inputType="password"
          inputName="oldPassword"
          maxLength={255}
        />
        <InputWithLabel 
          label="New Password"
          inputType="password"
          inputName="newPassword"
          maxLength={255}
        />
        <InputWithLabel 
          label="Confirm New Password"
          inputType="password"
          inputName="confirmNewPassword"
          maxLength={255}
        />
        <PrimaryButton 
          className="p-3 mt-4"
          type="submit"
        >
          Update Password
        </PrimaryButton>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
