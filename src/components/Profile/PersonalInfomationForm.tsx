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
  email: string;
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

  // Update form values from user data on component mount or user change
  useEffect(() => {
    if (user) {
      const {
        first_name,
        middle_name,
        last_name,
        place_of_birth,
        date_of_birth,
        gender,
        email,
        recovery_email,
        phone_number,
        emergency_contact_name,
        emergency_contact_number,
      } = user;

      setValue('firstName', first_name);
      setValue('middleName', middle_name || '');
      setValue('lastName', last_name);
      setValue('placeOfBirth', place_of_birth || '');
      setValue('dateOfBirth', date_of_birth || '');
      setValue('gender', gender || '');
      setValue('email', email);
      setValue('recoveryEmail', recovery_email || '');
      setValue('phoneNumber', phone_number);
      setValue('emergencyContactName', emergency_contact_name || '');
      setValue('emergencyContactNumber', emergency_contact_number || '');
    }
  }, [user, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await updatePersonalInformation(formData);
      setIsEditing(false); // Set isEditing to false to switch to display mode
      // Reset form fields
      reset({
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        placeOfBirth: formData.placeOfBirth,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        email: formData.email,
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
              error={errors.dateOfBirth?.message}
            />
            <SelectField
              label="Gender"
              options={genderOptions}
              placeholder="Select a Gender"
              {...register('gender', { required: 'Please select a gender' })}
              error={errors.gender?.message}
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
              {...register('recoveryEmail')}
              error={errors.recoveryEmail?.message}
            />
            <InputWithLabel 
              label="Phone Number"
              inputType="text"
              maxLength={12} // Adjusted for the format 09XX-XXX-XXXX
              {...register('phoneNumber', {
                required: 'Phone number is required',
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
              {...register('emergencyContactName')}
              error={errors.emergencyContactName?.message}
            />
            <InputWithLabel 
              label="Emergency Contact Number"
              inputType="text"
              maxLength={12} // Adjusted for the format 09XX-XXX-XXXX
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
            <DisplayField 
              label="Email Address"
              value={user?.email || ''}
            />
            <DisplayField 
              label="Recovery Email"
              value={user?.recovery_email || ''}
            />
            <DisplayField 
              label="Phone Number"
              value={user?.phone_number || ''}
            />
            <DisplayField 
              label="Emergency Contact Name"
              value={user?.emergency_contact_name || ''}
            />
            <DisplayField 
              label="Emergency Contact Number"
              value={user?.emergency_contact_number || ''}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default PersonalInformationPage;
