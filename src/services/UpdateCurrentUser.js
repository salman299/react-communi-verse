import AuthenticatedAPIClient from './api';

// Function to update user details, only changed fields
const updateCurrentUser = async (newUserDetails, existingUserDetails = {}) => {
  try {
    const formData = new FormData();

    // Iterate over the new user details
    Object.entries(newUserDetails).forEach(([key, newValue]) => {
      // Skip 'full_name' and 'area' unless they have changed
      if (key === 'full_name' || key === 'area') {
        if (newValue !== existingUserDetails[key]) {
          formData.append(key, newValue || '');
        }
        return;
      }

      // Check if the value has changed and add to FormData if it has
      const existingValue = existingUserDetails[key];
      if (newValue !== undefined && newValue !== null && newValue !== existingValue) {
        formData.append(key, newValue);
      }
    });

    // Always send 'full_name' and 'area' if they are part of newUserDetails
    if (newUserDetails.full_name) {
      formData.append('full_name', newUserDetails.full_name);
    }
    if (newUserDetails.area) {
      formData.append('area', newUserDetails.area);
    }

    const response = await AuthenticatedAPIClient.put('/api/v1/user/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error.response?.data || error.message);
    throw error;
  }
};

export default updateCurrentUser;
