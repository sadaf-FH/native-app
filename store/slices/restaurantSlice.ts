import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Restaurant } from '@/types/api.types';

interface RestaurantState {
  restaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurant: null,
  isLoading: false,
  error: null,
};

export const createRestaurant = createAsyncThunk(
  'restaurant/create',
  async (data: {
    name: string;
    franchise?: string | null;
    location: string;
    available?: boolean;
    timezone?: string;
  }, { rejectWithValue }) => {
    const response = await api.createRestaurant(data);
    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Failed to create restaurant');
    }
    return response.data;
  }
);

export const fetchRestaurant = createAsyncThunk(
  'restaurant/fetch',
  async (id: string, { rejectWithValue }) => {
    const response = await api.getRestaurantById(id);
    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Failed to fetch restaurant');
    }
    return response.data;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    logout: (state) => {
      state.restaurant = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
        state.isLoading = false;
        state.restaurant = action.payload;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRestaurant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurant.fulfilled, (state, action: PayloadAction<Restaurant>) => {
        state.isLoading = false;
        state.restaurant = action.payload;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;