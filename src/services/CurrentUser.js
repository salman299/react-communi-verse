import AuthenticatedAPIClient from './api';

export const CurrentUser = async () => {
  try {
    const response = await AuthenticatedAPIClient.get('/api/v1/user/');
    console.log(response.data); // Log the response to check its structure
    return response.data; // Adjust this to directly return the data object if `results` is not needed
  } catch (error) {
    console.error('Failed to fetch user data', error); // Log the error for debugging
    throw error.response?.data || error;
  }
};
