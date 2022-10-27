import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import cartSlice from "./cartSlice";
import fetchPizzasSlice from "./fetchPizzasSlice";

export const store = configureStore({
  reducer: { filterSlice, cartSlice, fetchPizzasSlice },
});
