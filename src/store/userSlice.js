// areaCitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Thunk to fetch cities
// Thunk to fetch cities
export const fetchuser = createAsyncThunk('user/fetchuser', async (_, { getState, rejectWithValue }) => {
  try {
    const { accessToken } = getState().auth;
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/current-user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    //areas: [],
    user: {},
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cities
      .addCase(fetchuser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;
