import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceCreate,serviceDelete,serviceGetAll,serviceGetById,serviceUpdate } from '../api'


const initialState = {
  service: {},
  services : [],
  count: 0,
  isLoading: false,
  error: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  extraReducers: (builder) => {
    builder
      // Get All Services
      .addCase(getAll.pending, (state) => {
        state.services = []
        state.count = 0
        state.isLoading = true
        state.error = null
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.services = action.payload.services
        state.count = action.payload.count
        state.isLoading = false
        state.error = null

      })
      .addCase(getAll.rejected, (state, action) => {
        state.services = []
        state.count = 0
        state.isLoading = false
        state.error = action.payload
      })
      // Get By ID / update that service
      .addCase(getById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.service = {}
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.service = action.payload
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.service = {}
      })
      // Update
      .addCase(update.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create
      .addCase(create.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.services = [action.payload,...state.services]
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete
      .addCase(elim.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(elim.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.services = state.services.map((service)=>{
          if(service._id !== action.payload._id){
            return service
          }
        }).filter(Boolean)
      })
      .addCase(elim.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      });;
  },
});

// Get All
export const getAll = createAsyncThunk(
  'services/getAll',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await serviceGetAll(obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Request failed')
      }

      // Return the response body as the payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Get By ID
export const getById = createAsyncThunk(
  'services/getById',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await serviceGetById(obj.serviceId,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Request failed')
      }

      // Return the response body as the payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Update thunk action
export const update = createAsyncThunk(
  'services/update',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await serviceUpdate(obj.service,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Request failed')
      }

      // Return the response body as the payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Create a Job
export const create = createAsyncThunk(
  'services/create',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await serviceCreate(obj.service,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Request failed')
      }

      // Return the response body as the payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Delete a service
export const elim = createAsyncThunk(
  'services/delete',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await serviceDelete(obj.serviceId,obj.token)

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Request failed')
      }

      // Return the response body as the payload
      return await response.json()

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export default servicesSlice.reducer