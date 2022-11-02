import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


type TCartItem = {
  id: string;
  imageUrl: string;
  name: string;
  type: string;
  size: number;
  count: number;
  price: number;
}

interface ICartSliceState {
  items:TCartItem[];
  countPizzas: number;
  totalPrice: number;
}

const initialState: ICartSliceState = {
  items: [],
  countPizzas: 0,
  totalPrice: 0,
};

const counterPizzas = (state: ICartSliceState) => {
  state.countPizzas = state.items.reduce((sum, item) => item.count + sum, 0);
};

const counterPrice = (state: ICartSliceState) => {
  state.totalPrice = state.items.reduce(
    (sum, item) => item.count * item.price + sum,
    0
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<TCartItem>) => {
      const pizza = state.items.find((item) => item.id === action.payload.id);

      if (pizza) {
        pizza.count++;
      } else {
        state.items.push(action.payload);
      }
      counterPizzas(state);
      counterPrice(state);
    },
    minusPizza: (state, action: PayloadAction<string>) => {
      const pizza = state.items.find((item) => item.id === action.payload);

      if (pizza && pizza.count > 1) {
        pizza.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      counterPizzas(state);
      counterPrice(state);
    },

    delletePizza: (state, action: PayloadAction<string>) => {
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

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCountCart = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((items) => items.id === id);

export const { addPizza, minusPizza, revomeCartItems, delletePizza } =
  cartSlice.actions;

export default cartSlice.reducer;
