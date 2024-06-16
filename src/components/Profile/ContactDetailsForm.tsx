"use client"
import React, { useEffect } from 'react';
import InputWithLabel from '../InputWithLabel';
import PrimaryButton from '../PrimaryButton';
import { useUser } from '../../context/UserContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getCookie } from '../../utils/cookies';

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
  username: string;
  email: string;
  recoveryEmail: string,
  phoneNumber: string,
  emergencyContactName: string,
  emergencyContactNumber: string,
}

/**
 * A form component for capturing contact details.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const ContactDetailsForm: React.FC = () => {
  const { user, loading, error } = useUser();
  const { register, handleSubmit, setValue } = useForm<FormData>();

  useEffect(() => {
    if (user) {
      setValue('email', user.email);
      setValue('recoveryEmail', user.recovery_email || '');
      setValue('phoneNumber', user.phone_number);
      setValue('emergencyContactName', user.emergency_contact_name || '');
      setValue('emergencyContactNumber', user.emergency_contact_number || '');
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const authToken = getCookie(document.cookie, 'auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/personal-information`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update personal information');
      }

      // Handle success (e.g., show a success message)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message || 'An unexpected error occurred');
      } else {
        console.error('An unexpected error occurred');
      }    
    }
  };

  return (
    <div className="grid grid-cols-1 rounded-lg shadow-lg border m-4 p-4">
      <span className="text-3xl font-bold text-center mb-4">Contact Details</span>
      <form className="grid grid-cols-3 gap-x-5" onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel 
          label="Email Address"
          inputType="text"
          maxLength={255}
          {...register('email')}
        />
        <InputWithLabel 
          label="Recovery Email"
          inputType="email"
          maxLength={255}
          {...register('recoveryEmail')}
        />
        <InputWithLabel 
          label="Phone Number"
          inputType="text"
          maxLength={13}
          {...register('phoneNumber')}
        />
        <InputWithLabel 
          label="Emergency Contact Name"
          inputType="text"
          maxLength={255}
          {...register('emergencyContactName')}
        />
        <InputWithLabel 
          label="Emergency Contact Number"
          inputType="text"
          maxLength={13}
          {...register('emergencyContactNumber')}
        />
        <PrimaryButton 
          className="col-start-2 col-span-1 p-3 mt-4"
          type="submit"
        >
          Update Contact
        </PrimaryButton>
      </form>
    </div>
  );
};

export default ContactDetailsForm;
