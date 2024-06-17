"use client"
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputWithLabel from '../InputWithLabel';
import DateInput from '../DateInput';
import SelectField from '../SelectField';
import PrimaryButton from '../PrimaryButton';
import DisplayField from '../DisplayField';
import { genderOptions } from '../../constants/genderOptions';
import { useUser } from '../../context/UserContext';
import { useEditViewMode } from '../../context/EditViewModeContext';
import updatePersonalInformation from '../../services/Profile/updatePersonalInformation';

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
  const { user } = useUser();
  
  // Use isEditing state from context
  const { isEditing, setIsEditing } = useEditViewMode();

  // Initialize form methods from react-hook-form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  // Update form values from user data on component mount or user change
  useEffect(() => {
    if (user) {
      setValue('firstName', user.first_name);
      setValue('middleName', user.middle_name || '');
      setValue('lastName', user.last_name);
      setValue('placeOfBirth', user.place_of_birth || '');
      setValue('dateOfBirth', user.date_of_birth || '');
      setValue('gender', user.gender || '');
    }
  }, [user, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await updatePersonalInformation(formData);
      setIsEditing(false); // Set isEditing to false to switch to display mode
    } catch (error: unknown) {
      console.error((error as Error).message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-y-3 rounded-lg shadow-lg border m-4 p-4">
      <span className="text-3xl font-bold text-center mb-4">Personal Information</span>
      <form className="grid grid-cols-3 gap-x-5" onSubmit={handleSubmit(onSubmit)}>
        {isEditing ? (
          <>
            <InputWithLabel 
              label="First Name"
              inputType="text"
              inputName="firstName"
              {...register('firstName', { 
                required: 'First name is required', 
                maxLength: { value: 255, message: 'First name must be less than 255 characters' } 
              })}
              error={errors.firstName?.message}
            />
            <InputWithLabel 
              label="Middle Name"
              inputType="text"
              inputName="middleName"
              {...register('middleName', { maxLength: { value: 255, message: 'Middle name must be less than 255 characters' } })}
              error={errors.middleName?.message}
            />
            <InputWithLabel 
              label="Last Name"
              inputType="text"
              inputName="lastName"
              {...register('lastName', { 
                required: 'Last name is required', 
                maxLength: { value: 255, message: 'Last name must be less than 255 characters' } 
              })}
              error={errors.lastName?.message}
            />
            <InputWithLabel 
              label="Place of Birth"
              inputType="text"
              inputName="placeOfBirth"
              {...register('placeOfBirth', { maxLength: { value: 255, message: 'Place of birth must be less than 255 characters' } })}
              error={errors.placeOfBirth?.message}
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
        ) : (
          <>
            <DisplayField 
              label="First Name"
              value={user?.first_name || ''}
            />
            <DisplayField 
              label="Middle Name"
              value={user?.middle_name || ''}
            />
            <DisplayField 
              label="Last Name"
              value={user?.last_name || ''}
            />
            <DisplayField 
              label="Place of Birth"
              value={user?.place_of_birth || ''}
            />
            <DisplayField 
              label="Date of Birth"
              value={user?.date_of_birth || ''}
            />
            <DisplayField 
              label="Gender"
              value={user?.gender || ''}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default PersonalInformationPage;
