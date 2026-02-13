import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Menu, MenuItem, OrderType, TimeAvailability, Addons } from '@/types/api.types';

interface MenuState {
  menu: Menu | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menu: null,
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  'menu/create',
  async ({ restaurantId, version = 1 }: { restaurantId: string; version?: number }, { rejectWithValue }) => {
    const response = await api.createMenu(restaurantId, version);
    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Failed to create menu');
    }
    return response.data;
  }
);

export const fetchMenuByRestaurant = createAsyncThunk(
  'menu/fetchByRestaurant',
  async (restaurantId: string, { rejectWithValue }) => {
    const response = await api.getMenuByRestaurant(restaurantId);
    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Failed to fetch menu');
    }
    return response.data;
  }
);

// Fixed: Added imageBase64 to the type
export const addMenuItem = createAsyncThunk(
  'menu/addItem',
  async ({ menuId, item }: { 
    menuId: string; 
    item: {
      categoryName: string;
      name: string;
      description?: string;
      price: number;
      orderType?: OrderType;
      time?: TimeAvailability;
      isVegetarian?: boolean;
      isSpicy?: boolean;
      isPopular?: boolean;
      isNew?: boolean;
      addons?: Addons;
      imageBase64?: string; // Added this
    }
  }, { rejectWithValue }) => {
    const response = await api.addMenuItem(menuId, item);
    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Failed to add menu item');
    }
    return response.data;
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/updateItem',
  async ({ menuId, itemId, item }: { 
    menuId: string; 
    itemId: string;
    item: Partial<{
      name: string;
      price: number;
      orderType: OrderType;
      time?: TimeAvailability;
      addons?: Addons;
      imageBase64?: string; // Added this
    }>;
  }, { rejectWithValue }) => {
    const response = await api.updateMenuItem(menuId, itemId, item);
    if (!response.success || !response.data) {
      return rejectWithValue(response.error || 'Failed to update menu item');
    }
    return response.data;
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteItem',
  async ({ menuId, itemId }: { menuId: string; itemId: string }, { rejectWithValue }) => {
    const response = await api.deleteMenuItem(menuId, itemId);
    if (!response.success) {
      return rejectWithValue(response.error || 'Failed to delete menu item');
    }
    return itemId;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearMenu: (state) => {
      state.menu = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Menu
      .addCase(createMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        state.menu = action.payload;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Menu
      .addCase(fetchMenuByRestaurant.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuByRestaurant.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.isLoading = false;
        state.menu = action.payload;
      })
      .addCase(fetchMenuByRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add Item
      .addCase(addMenuItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMenuItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Item
      .addCase(updateMenuItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMenuItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMenuItem.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMenu, clearError } = menuSlice.actions;
export default menuSlice.reducer;