import React from 'react';
import InputWithLabel from '../InputWithLabel';
import DateInput from '../DateInput';
import SelectField from '../SelectField';
import PrimaryButton from '../PrimaryButton';

// Options for the select field
const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];

/**
 * A form component for capturing personal information.
 * 
 * @returns {JSX.Element} - The rendered component
 */
const PersonalInformationForm: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-y-3 rounded-lg shadow-lg border m-4 p-4">
      <span className="text-3xl font-bold text-center mb-4">Personal Information</span>
      <form className="grid grid-cols-3 gap-x-5">
        <InputWithLabel 
          label="First Name"
          inputType="text"
          inputName="firstName"
          maxLength={255}
        />
        <InputWithLabel 
          label="Middle Name"
          inputType="text"
          inputName="middleName"
          maxLength={255}
        />
        <InputWithLabel 
          label="Last Name"
          inputType="text"
          inputName="lastName"
          maxLength={255}
        />
        <InputWithLabel 
          label="Place of Birth"
          inputType="text"
          inputName="placeOfBirth"
          maxLength={255}
        />
        <DateInput 
          label="Date of Birth"
          inputName="dateOfBirth"
        />
        <SelectField
          label="Gender"
          inputName="gender"
          options={genderOptions}
        />
        <DateInput 
          label="Internship Start Date"
          inputName="internshipStartDate"
        />
        <DateInput 
          label="Internship End Date"
          inputName="internshipEndDate"
        />
        <InputWithLabel 
          label="Department"
          inputType="text"
          inputName="department"
          maxLength={255}
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

export default PersonalInformationForm;
