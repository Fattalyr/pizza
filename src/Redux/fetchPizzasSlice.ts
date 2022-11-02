import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";


export type TPizza = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  count?: number;
}

type TFetchPizzas = {
  items:TPizza[];
  count: number;
}

interface IPizzaSliceState {
  items:TPizza[];
  countPizzas: number;
  loading?: boolean;
}

const initialState: IPizzaSliceState  = {
  items:[],
  countPizzas: 0,
  loading: true,
};

export const fetchPizzas = createAsyncThunk<TFetchPizzas, Record<string, string>>(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { categoriesId, sortPizza, order_ASC_DESC, searchValue, onPage } =
      params;
    const { data } = await axios.get<TFetchPizzas>(
      `https://634fde2edf22c2af7b5c5141.mockapi.io/items?search=${searchValue}&page=${onPage}&limit=8&${categoriesId}&${sortPizza}&${order_ASC_DESC}`
    );
    return data;
  }
);

export const fetchPizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action)=> {
      state.items = [];
      state.countPizzas = 0;
      state.loading = true;
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action)=> { 
      state.items = action.payload.items;
      state.countPizzas = action.payload.count;
      state.loading = false;
    })
    builder.addCase(fetchPizzas.rejected, (state, action)=> {
    })
  } 
});

export const selectPizzas = (state: RootState) => state.fetchPizzasSlice; // селектор, просто функция, перенесли в Slice

// export const {} = fetchPizzasSlice.actions;

export default fetchPizzasSlice.reducer;
