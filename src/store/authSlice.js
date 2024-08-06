import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = {
      username: credentials.username,
      password: credentials.password,
      client_id: 'public',
      grant_type: 'password'
    };
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/token/`, formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState, rejectWithValue }) => {
  try {
    const { refreshToken } = getState().auth;
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/token/`, {
      refresh_token: refreshToken,
      client_id: 'public',
      grant_type: 'refresh_token'
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/register/`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    expiresIn: null,
    isRefreshing: false
    // user: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = Date.now() + action.payload.expires_in * 1000;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = Date.now() + action.payload.expires_in * 1000;
        state.isAuthenticated = true;
        state.isRefreshing = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isRefreshing = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
