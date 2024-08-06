// src/redux/appInitialization.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAreas, fetchCities } from './areaCitySlice';
// Import other necessary actions or thunks

export const initializeApp = createAsyncThunk('app/initialize', async (_, { dispatch, getState }) => {
  // Check if user is authenticated
  const { isAuthenticated } = getState().auth;
  const { areas } = getState().areaCity;

  if (isAuthenticated) {
    // Add events for the Authenticated User
  }
  if (areas) {
    await dispatch(fetchAreas());
    await dispatch(fetchCities());
  }
});
