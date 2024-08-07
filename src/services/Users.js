import AuthenticatedAPIClient from './api';

export const Users = async () => {
  try {
    const response = await AuthenticatedAPIClient.get('/api/v1/users/');
    return response.data.results;
  } catch (error) {
    throw error.response?.data || error;
  }
};
