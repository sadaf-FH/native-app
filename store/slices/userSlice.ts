import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  phone?: string;
}

interface UserState {
  user: User | null;
  isRegistered: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isRegistered: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Saga will listen to this action
    registerUser: (state, action: PayloadAction<User>) => {
      state.isLoading = true;
    },
    // Saga will dispatch this after processing
    registerUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isRegistered = true;
      state.isLoading = false;
    },
    registerUserFailure: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isRegistered = false;
      state.isLoading = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { 
  registerUser, 
  registerUserSuccess, 
  registerUserFailure,
  logout, 
  updateUser 
} = userSlice.actions;

export default userSlice.reducer;