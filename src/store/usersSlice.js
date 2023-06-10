import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { register, userGetAll, userGetById, userUpdate } from '../api'


const initialState = {
  user: {},
  users: [],
  isLoading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.user = action.payload.user
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      //Get All
      .addCase(getAll.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.users = action.payload.users
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      //Get By Id
      .addCase(getById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.user = {}
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.user = {}
      })
      //Update
      .addCase(update.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      });
  },
});

// Create thunk action
export const create = createAsyncThunk(
  'user/create',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a create request to the server
      const response = await register(obj.user,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'request failed')
      }

      // Return the user retorned by the server as payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// getAll thunk action
export const getAll = createAsyncThunk(
  'user/getAll',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a getAll request to the server
      const response = await userGetAll(obj.filter,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'request failed')
      }

      // Return the user retorned by the server as payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// get By Id thunk action
export const getById = createAsyncThunk(
  'user/getById',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a getAll request to the server
      const response = await userGetById(obj.userId,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'request failed')
      }

      // Return the user retorned by the server as payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Update thunk action
export const update = createAsyncThunk(
  'user/update',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a update request to the server
      const response = await userUpdate(obj.user,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'request failed')
      }

      // Return the user retorned by the server as payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export default usersSlice.reducer