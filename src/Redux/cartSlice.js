import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  countPizzas: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      if (state.items.find((item) => item.id === action.payload.id)) {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        state.items[index] = {
          ...action.payload,
          count: state.items[index].count + 1,
        };
      } else {
        state.items.push(action.payload);
      }

      state.countPizzas = state.items.reduce(
        (sum, item) => item.count + sum,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => item.count * item.price + sum,
        0
      );
    },
    minusPizza: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.items[index].count > 1) {
        state.items[index] = {
          ...action.payload,
          count: state.items[index].count - 1,
        };
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
      state.countPizzas = state.items.reduce(
        (sum, item) => item.count + sum,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => item.count * item.price + sum,
        0
      );
    },

    delletePizza: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.countPizzas = state.items.reduce(
        (sum, item) => item.count + sum,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => item.count * item.price + sum,
        0
      );
    },

    revomeCartItems: (state) => {
      state.items = [];
      state.countPizzas = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addPizza, minusPizza, revomeCartItems, delletePizza } =
  cartSlice.actions;

export default cartSlice.reducer;
