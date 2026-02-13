import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import restaurantReducer from './slices/restaurantSlice';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    restaurant: restaurantReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;