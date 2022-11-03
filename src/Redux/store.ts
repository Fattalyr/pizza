import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cartSlice';
import filterSlice from './filterSlice';
import fetchPizzasSlice from './fetchPizzasSlice';

export const store = configureStore({
  reducer: { filterSlice, cartSlice, fetchPizzasSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
