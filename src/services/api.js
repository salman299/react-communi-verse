import axios from 'axios';
import { store } from 'store';

const AuthenticatedAPIClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

AuthenticatedAPIClient.interceptors.request.use((config) => {
  // Get the current state from Redux
  const state = store.getState();
  let token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default AuthenticatedAPIClient;
