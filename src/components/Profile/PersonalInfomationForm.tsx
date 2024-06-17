"use client"
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
import updatePersonalInformation from '../../services/Profile/updatePersonalInformation';

// Define the interface for user data
interface UserData {
  first_name: string;
  middle_name: string | null;
  last_name: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  email: string;
  username: string;
  recovery_email: string | null;
  phone_number: string | null;
  emergency_contact_name: string | null;
  emergency_contact_number: string | null;
}

// Define the interface for form data
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  username: string;
  recoveryEmail: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}

const PersonalInformationPage: React.FC = () => {
  // Get user context
  const { user } = useUser();

  // Use isEditing state from context
  const { isEditing, setIsEditing } = useEditViewMode();

  // Initialize form methods from react-hook-form
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormData>();

  // State to manage displayed user information
  const [displayUser, setDisplayUser] = useState<UserData | null>(null);

  // Update form values from user data on component mount or user change
  useEffect(() => {
    if (user) {
      setDisplayUser(user);
      setValue('firstName', user.first_name);
      setValue('middleName', user.middle_name || '');
      setValue('lastName', user.last_name);
      setValue('placeOfBirth', user.place_of_birth);
      setValue('dateOfBirth', user.date_of_birth);
      setValue('gender', user.gender);
      setValue('email', user.email);
      setValue('username', user.username);
      setValue('recoveryEmail', user.recovery_email || '');
      setValue('phoneNumber', user.phone_number || '');
      setValue('emergencyContactName', user.emergency_contact_name || '');
      setValue('emergencyContactNumber', user.emergency_contact_number || '');
    }
  }, [user, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await updatePersonalInformation(formData);
      setIsEditing(false); // Set isEditing to false to switch to display mode

      // Construct displayUser object based on formData
      const updatedDisplayUser: UserData = {
        first_name: formData.firstName,
        middle_name: formData.middleName || null,
        last_name: formData.lastName,
        place_of_birth: formData.placeOfBirth,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email,
        username: formData.username,
        recovery_email: formData.recoveryEmail || null,
        phone_number: formData.phoneNumber || null,
        emergency_contact_name: formData.emergencyContactName || null,
        emergency_contact_number: formData.emergencyContactNumber || null,
      };

      setDisplayUser(updatedDisplayUser); // Update display state with updated user data

      // Reset form fields
      reset({
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        placeOfBirth: formData.placeOfBirth,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email,
        username: formData.username,
        recoveryEmail: formData.recoveryEmail,
        phoneNumber: formData.phoneNumber,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactNumber: formData.emergencyContactNumber,
      });
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
              maxLength={255}
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
              maxLength={255}
              {...register('middleName', { 
                maxLength: { value: 255, message: 'Middle name must be less than 255 characters' } 
              })}
              error={errors.middleName?.message}
            />
            <InputWithLabel 
              label="Last Name"
              inputType="text"
              inputName="lastName"
              maxLength={255}
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
              maxLength={255}
              {...register('placeOfBirth', { 
                required: 'Place of birth is required', 
                maxLength: { value: 255, message: 'Place of birth must be less than 255 characters' } 
              })}
              error={errors.placeOfBirth?.message}
            />
            <DateInput 
              label="Date of Birth"
              {...register('dateOfBirth', { 
                required: 'Date of Birth is required'
              })}
              error={errors.dateOfBirth?.message}
            />
            <SelectField
              label="Gender"
              options={genderOptions}
              placeholder="Select a Gender"
              {...register('gender', { 
                required: 'Please select a gender' })
              }
              error={errors.gender?.message}
            />
            <InputWithLabel 
              label="Username"
              inputType="text"
              inputName="username"
              maxLength={255}
              {...register('username', { 
                required: 'Username is required', 
                maxLength: { value: 255, message: 'Username must be less than 255 characters' } 
              })}
              error={errors.username?.message}
            />
            <InputWithLabel 
              label="Email Address"
              inputType="text"
              maxLength={255}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />
            <InputWithLabel 
              label="Recovery Email"
              inputType="text"
              maxLength={255}
              {...register('recoveryEmail', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid recovery email address'
                }
              })}
              error={errors.recoveryEmail?.message}
            />
            <InputWithLabel 
              label="Phone Number"
              inputType="text"
              maxLength={13}
              {...register('phoneNumber', {
                pattern: {
                  value: /^\d{4}-\d{3}-\d{4}$/,
                  message: 'Invalid phone number format (e.g., 09XX-XXX-XXXX)'
                }
              })}
              error={errors.phoneNumber?.message}
            />
            <InputWithLabel 
              label="Emergency Contact Name"
              inputType="text"
              maxLength={255}
              {...register('emergencyContactName', {
                maxLength: { value: 255, message: 'Emergency Contact Name must be less than 255 characters' } 
              })}              
              error={errors.emergencyContactName?.message}
            />
            <InputWithLabel 
              label="Emergency Contact Number"
              inputType="text"
              maxLength={13}
              {...register('emergencyContactNumber', {
                pattern: {
                  value: /^\d{4}-\d{3}-\d{4}$/,
                  message: 'Invalid phone number format (e.g., 09XX-XXX-XXXX)'
                }
              })}
              error={errors.emergencyContactNumber?.message}
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
              value={displayUser?.first_name || 'N/A'}
            />
            <DisplayField 
              label="Middle Name"
              value={displayUser?.middle_name || 'N/A'}
            />
            <DisplayField 
              label="Last Name"
              value={displayUser?.last_name || 'N/A'}
            />
            <DisplayField 
              label="Place of Birth"
              value={displayUser?.place_of_birth || 'N/A'}
            />
            <DisplayField 
              label="Date of Birth"
              value={displayUser?.date_of_birth || 'N/A'}
            />
            <DisplayField 
              label="Gender"
              value={displayUser?.gender || 'N/A'}
            />
            <DisplayField 
              label="Email Address"
              value={displayUser?.email || 'N/A'}
            />
            <DisplayField 
              label="Username"
              value={displayUser?.username || 'N/A'}
            />
            <DisplayField 
              label="Recovery Email"
              value={displayUser?.recovery_email || 'N/A'}
            />
            <DisplayField 
              label="Phone Number"
              value={displayUser?.phone_number || 'N/A'}
            />
            <DisplayField 
              label="Emergency Contact Name"
              value={displayUser?.emergency_contact_name || 'N/A'}
            />
            <DisplayField 
              label="Emergency Contact Number"
              value={displayUser?.emergency_contact_number || 'N/A'}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default PersonalInformationPage;
