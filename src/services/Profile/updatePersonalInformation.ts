import { getCookie } from '../../utils/cookies';

interface UserData {
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

export default async function updateUserPersonalInformation(formData: UserData): Promise<void> {
  try {
    const formattedData = {
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

    const authToken = getCookie(document.cookie, 'auth_token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/users`, {
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
