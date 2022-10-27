import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  countPizzas: 0,
  loading: true,
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { categoriesId, sortPizza, order_ASC_DESC, searchValue, onPage } =
      params;
    const { data } = await axios.get(
      `https://634fde2edf22c2af7b5c5141.mockapi.io/items?search=${searchValue}&page=${onPage}&limit=8&${categoriesId}&${sortPizza}&${order_ASC_DESC}`
    );
    return data;
  }
);

export const fetchPizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.countPizzas = [];
      state.countPizzas = 0;
      state.loading = true;
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.countPizzas = action.payload.count;
      state.loading = false;
    },
    [fetchPizzas.rejected]: (state, action) => {},
  },
});

export const {} = fetchPizzasSlice.actions;

export default fetchPizzasSlice.reducer;
