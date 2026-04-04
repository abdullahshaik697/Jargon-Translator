import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import translateReducer from './translateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    translate: translateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = <T,>(selector: (state: RootState) => T) => selector(store.getState());