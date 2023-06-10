import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { vehicleCreate,vehicleDelete,vehicleGetById,vehicleUpdate,vehicleGetAll } from '../api'


const initialState = {
    vehicle : {},
    vehicles : [],
    count: 0,
    isLoading: false,
    error: null,
}

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  extraReducers: (builder) => {
    builder
      // Get By ID / update that service
      .addCase(getById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.vehicle = {}
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.vehicle = action.payload
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.vehicle = {}
      })
      // Update
      .addCase(update.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.vehicles = state.vehicles.map((vehicle)=>{
          if(vehicle._id === action.payload._id){
            return action.payload
          }
          return vehicle
        })
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
        state.vehicles = [action.payload,...state.vehicles]
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
        state.vehicles = state.vehicles.map((vehicle)=>{
          if(vehicle._id !== action.payload._id){
            return vehicle
          }
        }).filter(Boolean)
      })
      .addCase(elim.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get All
      .addCase(getAll.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.vehicles = []
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.vehicles = action.payload.vehicles
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.vehicles = []
      });
  },
});


// Get By ID
export const getById = createAsyncThunk(
  'vehicles/getById',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await vehicleGetById(obj.vehicleId,obj.token)

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
  'vehicles/update',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await vehicleUpdate(obj.vehicle,obj.token)

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

// Create a vehicle
export const create = createAsyncThunk(
  'vehicles/create',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await vehicleCreate(obj.vehicle,obj.token)

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

// Delete a vehicle
export const elim = createAsyncThunk(
  'vehicles/delete',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a request to the server
      const response = await vehicleDelete(obj.vehicleId,obj.token)

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


// getAll thunk action
export const getAll = createAsyncThunk(
  'vehicles/getAll',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a getAll request to the server
      const response = await vehicleGetAll(obj.filter,obj.token)

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

export default vehiclesSlice.reducer