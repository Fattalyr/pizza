import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  countPizzas: 0,
  totalPrice: 0,
};

const counterPizzas = (state) => {
  state.countPizzas = state.items.reduce((sum, item) => item.count + sum, 0);
};

const counterPrice = (state) => {
  state.totalPrice = state.items.reduce(
    (sum, item) => item.count * item.price + sum,
    0
  );
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const pizza = state.items.find((item) => item.id === action.payload.id);

      if (pizza) {
        pizza.count++;
      } else {
        state.items.push(action.payload);
      }
      counterPizzas(state);
      counterPrice(state);
    },
    minusPizza: (state, action) => {
      const pizza = state.items.find((item) => item.id === action.payload);

      if (pizza.count > 1) {
        pizza.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      counterPizzas(state);
      counterPrice(state);
    },

    delletePizza: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      counterPizzas(state);
      counterPrice(state);
    },

    revomeCartItems: (state) => {
      state.items = [];
      state.countPizzas = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cartSlice;
export const selectCountCart = (id) => (state) =>
  state.cartSlice.items.find((items) => items.id === id);

export const { addPizza, minusPizza, revomeCartItems, delletePizza } =
  cartSlice.actions;

export default cartSlice.reducer;
