import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  registerUser, 
  registerUserSuccess, 
  registerUserFailure,
  logout,
  User 
} from '../slices/userSlice';

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Handle user registration
function* handleRegisterUser(action: PayloadAction<User>) {
  try {
    // Simulate API call delay
    yield call(delay, 800);
    
    // Success - update state
    yield put(registerUserSuccess(action.payload));
    
    console.log('User registered:', action.payload);
  } catch (error) {
    console.error('Registration failed:', error);
    yield put(registerUserFailure());
  }
}

// Handle user logout
function* handleLogout() {
  try {
    // You could call logout API here
    yield call(delay, 300);
    
    console.log('User logged out');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

// Watch for user actions
export function* watchUserActions() {
  yield takeLatest(registerUser.type, handleRegisterUser);
  yield takeLatest(logout.type, handleLogout);
}