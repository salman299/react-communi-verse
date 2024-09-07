import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAreas, fetchCities } from './areaCitySlice';
import { fetchUser } from './userSlice';

export const initializeApp = createAsyncThunk('app/initialize', async (_, { dispatch }) => {
  await dispatch(fetchAreas());
  await dispatch(fetchCities());
  await dispatch(fetchUser());
});
