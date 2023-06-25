import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import {
  repairCreate,
  repairDelete,
  repairGetById,
  repairUpdate,
  repiarGetAll
} from '../api'


const initialState = {
  repair: {},
  repairs: [],
  count: 0,
  isLoading: false,
  error: null,
}

const repairsSlice = createSlice({
  name: 'repairs',
  initialState,
  extraReducers: (builder) => {
    builder
      // Get By ID / update that service
      .addCase(getById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.repair = {}
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.repair = action.payload
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.repair = {}
      })
      // Update
      .addCase(update.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.repairs = state.repairs.map((repair) => {
          if (repair._id === action.payload._id) {
            return action.payload
          }
          return e
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
        state.repairs = [action.payload, ...state.repairs]
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
        state.repairs = state.repairs.map((repair) => {
          if (repair._id !== action.payload._id) {
            return repair
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
        state.repairs = []
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.repairs = action.payload.repairs
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.repairs = []
      });
  },
});


// Get By ID
export const getById = createAsyncThunk(
  'repairs/getById',
  async (obj, {
    rejectWithValue
  }) => {
    try {
      // Make a request to the server
      const response = await repairGetById(obj.repairId, obj.token)

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
  'repairs/update',
  async (obj, {
    rejectWithValue
  }) => {
    try {
      // Make a request to the server
      const response = await repairUpdate(obj.repair, obj.token)

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

// Create a repair
export const create = createAsyncThunk(
  'repairs/create',
  async (obj, {
    rejectWithValue
  }) => {
    try {
      // Make a request to the server
      const response = await repairCreate(obj.repair, obj.token)

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

// Delete a repair
export const elim = createAsyncThunk(
  'repairs/delete',
  async (obj, {
    rejectWithValue
  }) => {
    try {
      // Make a request to the server
      const response = await repairDelete(obj.repairId, obj.token)

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
  'repairs/getAll',
  async (obj, { rejectWithValue }) => {
    try {
      // Make a getAll request to the server
      const response = await repiarGetAll(obj.filter,obj.token)

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

export default repairsSlice.reducer