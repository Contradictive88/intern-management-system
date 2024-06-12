import axios, { AxiosResponse } from 'axios';

// Define the structure of the form data
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

// Utility function to handle the API request
const updatePersonalInformation = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.patch(
      `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/personal-information`,
      formData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error updating personal information');
    } else {
      throw new Error('Error updating personal information');
    }
  }
};

export default updatePersonalInformation;
