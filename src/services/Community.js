import AuthenticatedAPIClient from './api';

export const createCommunity = async (communityData) => {
  try {
    const response = await AuthenticatedAPIClient.post('/api/v1/communities/', communityData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCommunity = async (slug, communityData) => {
  try {
    const response = await AuthenticatedAPIClient.patch(`/api/v1/communities/${slug}/`, communityData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
