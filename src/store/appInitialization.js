// src/redux/appInitialization.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAreas, fetchCities } from './areaCitySlice';
import { fetchUser } from './userSlice';
// Import other necessary actions or thunks

export const initializeApp = createAsyncThunk('app/initialize', async (_, { dispatch }) => {
  // Check if user is authenticated
  // const { isAuthenticated } = getState().auth;
  // const { areas } = getState().areaCity;
  // const { user } = getState().user;
  await dispatch(fetchAreas());
  await dispatch(fetchCities());
  await dispatch(fetchUser());
  console.log("Hello");
});
