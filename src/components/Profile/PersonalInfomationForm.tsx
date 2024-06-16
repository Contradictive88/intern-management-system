"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import InputWithLabel from '../InputWithLabel';
import DateInput from '../DateInput';
import SelectField from '../SelectField';
import PrimaryButton from '../PrimaryButton';
import { genderOptions } from '../../constants/genderOptions';
import { useUser } from '../../context/UserContext';

export interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
}

// Define the structure of the API response
export interface ApiResponse {
  data: any; // Replace with the actual data type from your API response
}

/**
 * Utility function to handle the API request for updating personal information.
 * 
 * @param {FormData} formData - The form data to be sent in the request body
 * @returns {Promise<ApiResponse>} - The API response
 * @throws {Error} - Throws error if the API request fails
 */
const updatePersonalInformation = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/personal-information`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include', // Include cookies with the request
    });

    if (!response.ok) {
      // Try to parse the error response as JSON
      let errorResponse;
      try {
        errorResponse = await response.json();
      } catch {
        // If parsing fails, use the status text as the error message
        throw new Error(response.statusText || 'Failed to update personal information');
      }
      // If the error response contains a message, throw it
      if (errorResponse && errorResponse.message) {
        throw new Error(errorResponse.message);
      } else {
        // If no message, throw a generic error
        throw new Error('Failed to update personal information');
      }
    }

    // Parse and return the JSON response if the request was successful
    return await response.json();
  } catch (error) {
    const errorMessage = (error as Error).message || 'Error updating personal information';
    throw new Error(errorMessage);
  }
};

/**
 * A page component for capturing personal information.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const PersonalInformationPage: React.FC = () => {
  const { user, loading, error } = useUser();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    placeOfBirth: '',
    dateOfBirth: '',
    gender: '',
  });

  // useEffect to update form data when user context updates
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name,
        middleName: user.middle_name || '',
        lastName: user.last_name,
        placeOfBirth: user.place_of_birth || '',
        dateOfBirth: user.date_of_birth || '',
        gender: user.gender || '',
      });
    }
  }, [user]);

  // Function to handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePersonalInformation(formData);

      // Reset form after successful submission
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        placeOfBirth: '',
        dateOfBirth: '',
        gender: '',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-y-3 rounded-lg shadow-lg border m-4 p-4">
      <span className="text-3xl font-bold text-center mb-4">Personal Information</span>
      <form className="grid grid-cols-3 gap-x-5" onSubmit={handleSubmit}>
        <InputWithLabel 
          label="First Name"
          inputType="text"
          inputName="firstName"
          maxLength={255}
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <InputWithLabel 
          label="Middle Name"
          inputType="text"
          inputName="middleName"
          maxLength={255}
          value={formData.middleName}
          onChange={handleInputChange}
        />
        <InputWithLabel 
          label="Last Name"
          inputType="text"
          inputName="lastName"
          maxLength={255}
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <InputWithLabel 
          label="Place of Birth"
          inputType="text"
          inputName="placeOfBirth"
          maxLength={255}
          value={formData.placeOfBirth}
          onChange={handleInputChange}
        />
        <DateInput 
          label="Date of Birth"
          inputName="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
        <SelectField
          label="Sex"
          inputName="gender"
          options={genderOptions}
          placeholder="Select a Gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
        <PrimaryButton 
          className="col-start-2 col-span-1 p-3 mt-4"
          type="submit"
        >
          Update Info
        </PrimaryButton>
      </form>
    </div>
  );
};

export default PersonalInformationPage;
