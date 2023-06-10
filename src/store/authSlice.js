import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../api'


const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthenticated = false
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      });
  },
});

// Login thunk action
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Make a login request to the server
      const response = await auth(credentials.email,credentials.password)

      // Check if the login was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed')
      }

      // Return the token and user as the payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const {logout} = authSlice.actions
export default authSlice.reducer