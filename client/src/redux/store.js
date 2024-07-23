import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';

// Configure store
export const store = configureStore({
  reducer: { user: userSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
