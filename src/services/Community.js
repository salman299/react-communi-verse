import AuthenticatedAPIClient from './api';

export const createCommunity = async (userData) => {
  try {
    const response = await AuthenticatedAPIClient.post('/api/v1/communities/', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
