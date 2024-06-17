import { getCookie } from '../../utils/cookies';

interface UserData {
  firstName: string;
  middleName: string;
  lastName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: string;
}

export default async function updateUserPersonalInformation(formData: UserData): Promise<void> {
  try {
    const formattedData = {
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      place_of_birth: formData.placeOfBirth,
      date_of_birth: formData.dateOfBirth,
      gender: formData.gender.toLowerCase()
    };

    const authToken = getCookie(document.cookie, 'auth_token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/users/personal-information`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(formattedData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update personal information');
    }
  } catch (error) {
    throw new Error('An unexpected error occurred');
  }
}
