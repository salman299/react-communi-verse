// areaCitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch areas
export const fetchAreas = createAsyncThunk('areaCity/fetchAreas', async (_, { getState, rejectWithValue }) => {
  try {
    const { accessToken } = getState().auth;
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/areas/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      } 

      
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to fetch cities
export const fetchCities = createAsyncThunk('areaCity/fetchCities', async (_, { getState, rejectWithValue }) => {
  try {
    const { accessToken } = getState().auth;
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/areas-cities/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const areaCitySlice = createSlice({
  name: 'areaCity',
  initialState: {
    areas: [],
    cities: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Areas
      .addCase(fetchAreas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.areas = action.payload;
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Cities
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default areaCitySlice.reducer;
