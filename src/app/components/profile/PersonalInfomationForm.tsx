import React, { useState, ChangeEvent, FormEvent } from 'react';
import InputWithLabel from '../InputWithLabel';
import DateInput from '../DateInput';
import SelectField from '../SelectField';
import PrimaryButton from '../PrimaryButton';
import { genderOptions } from '../../constants/genderOptions';
import updatePersonalInformation, { FormData, ApiResponse } from '../../api/updatePersonalInfromation';

/**
 * A page component for capturing personal information.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const PersonalInformationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    placeOfBirth: '',
    dateOfBirth: '',
    gender: '',
  });

  // Function to handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: ApiResponse = await updatePersonalInformation(formData);
      console.log(response); // Log the response from the API
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

export async function getStaticProps() {
  return { props: {}, revalidate: 60 };
}

export default PersonalInformationPage;
