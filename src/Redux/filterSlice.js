import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    "Все",
    "Мясные",
    "Вегетерианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ],
  sortBy: [
    { name: "популярности (ASC)", sortProperty: "rating" },
    { name: "популярности (DESC)", sortProperty: "-rating" },
    { name: "цене (ASC)", sortProperty: "price" },
    { name: "цене (DESC)", sortProperty: "-price" },
    { name: "алфавиту (ASC)", sortProperty: "name" },
    { name: "алфавиту (DESC)", sortProperty: "-name" },
  ],
  activeCatogorie: 0,
  activeSortBy: { name: "популярности (ASC)", sortProperty: "rating" },
};

export const filterSlice = createSlice({
  name: "filtres",
  initialState,
  reducers: {
    setActiveCat: (state, action) => {
      state.activeCatogorie = action.payload;
    },
    setActiveSortBy: (state, action) => {
      state.activeSortBy = action.payload;
    },
  },
});

export const { setActiveCat, setActiveSortBy } = filterSlice.actions;

export default filterSlice.reducer;
