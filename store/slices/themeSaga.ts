import { takeLatest, call } from 'redux-saga/effects';
import { toggleTheme } from '../slices/themeSlice';

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Handle theme toggle
function* handleThemeToggle() {
  try {
    // You could save theme preference to API here
    yield call(delay, 100);
    
    console.log('Theme toggled');
  } catch (error) {
    console.error('Theme toggle failed:', error);
  }
}

// Watch for theme actions
export function* watchThemeActions() {
  yield takeLatest(toggleTheme.type, handleThemeToggle);
}