"use client";
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputWithLabel from '../InputWithLabel';
import DateInput from '../DateInput';
import SelectField from '../SelectField';
import PrimaryButton from '../PrimaryButton';
import DisplayField from '../DisplayField';
import { genderOptions } from '../../constants/genderOptions';
import { useUser } from '../../context/UserContext';
import { useEditViewMode } from '../../context/EditViewModeContext';
import { getCookie } from '../../utils/cookies';

// Define the interface for form data
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
}

const PersonalInformationPage: React.FC = () => {
  // Get user context
  const { user, loading, error } = useUser();
  
  // Use isEditing state from context
  const { isEditing } = useEditViewMode(); 

  // Initialize form methods from react-hook-form
  const { register, handleSubmit, setValue } = useForm<FormData>();

  // Initialize state to manage form values
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    placeOfBirth: '',
    dateOfBirth: '',
    gender: ''
  });

  // Update form values from user data on component mount or user change
  useEffect(() => {
    if (user) {
      setValue('firstName', user.first_name);
      setValue('middleName', user.middle_name || '');
      setValue('lastName', user.last_name);
      setValue('placeOfBirth', user.place_of_birth || '');
      setValue('dateOfBirth', user.date_of_birth || '');
      setValue('gender', user.gender || '');
      setFormData({
        firstName: user.first_name,
        middleName: user.middle_name || '',
        lastName: user.last_name,
        placeOfBirth: user.place_of_birth || '',
        dateOfBirth: user.date_of_birth || '',
        gender: user.gender || ''
      });
    }
  }, [user, setValue]);

  // Handle form submission
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
    <div className="grid grid-cols-1 gap-y-3 rounded-lg shadow-lg border m-4 p-4">
      <span className="text-3xl font-bold text-center mb-4">Personal Information</span>
      <form className="grid grid-cols-3 gap-x-5" onSubmit={handleSubmit(onSubmit)}>
        {!isEditing ? (
          <>
            <DisplayField 
              label="First Name"
              value={formData.firstName}
            />
            <DisplayField 
              label="Middle Name"
              value={formData.middleName}
            />
            <DisplayField 
              label="Last Name"
              value={formData.lastName}
            />
            <DisplayField 
              label="Place of Birth"
              value={formData.placeOfBirth}
            />
            <DisplayField 
              label="Date of Birth"
              value={formData.dateOfBirth}
            />
            <DisplayField 
              label="Gender"
              value={formData.gender}
            />
          </>
        ) : (
          <>
            <InputWithLabel 
              label="First Name"
              inputType="text"
              maxLength={255}
              {...register('firstName')}
            />
            <InputWithLabel 
              label="Middle Name"
              inputType="text"
              maxLength={255}
              {...register('middleName')}
            />
            <InputWithLabel 
              label="Last Name"
              inputType="text"
              maxLength={255}
              {...register('lastName')}
            />
            <InputWithLabel 
              label="Place of Birth"
              inputType="text"
              maxLength={255}
              {...register('placeOfBirth')}
            />
            <DateInput 
              label="Date of Birth"
              {...register('dateOfBirth')}
            />
            <SelectField
              label="Gender"
              options={genderOptions}
              placeholder="Select a Gender"
              {...register('gender')}
            />
            <PrimaryButton 
              className="col-start-2 col-span-1 p-3 mt-4"
              type="submit"
            >
              Update Info
            </PrimaryButton>
          </>
        )}
      </form>
    </div>
  );
};

export default PersonalInformationPage;
