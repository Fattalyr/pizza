import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import cartSlice from "./cartSlice";
import fetchPizzasSlice from "./fetchPizzasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filterSlice, cartSlice, fetchPizzasSlice },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
