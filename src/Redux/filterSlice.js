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
    { name: "популярности (ASC)", sortProperty: "-rating" },
    { name: "популярности (DESC)", sortProperty: "rating" },
    { name: "цене (ASC)", sortProperty: "price" },
    { name: "цене (DESC)", sortProperty: "-price" },
    { name: "алфавиту (ASC)", sortProperty: "name" },
    { name: "алфавиту (DESC)", sortProperty: "-name" },
  ],
  activeCatogorie: 0, //выбранная категория
  activeSortBy: { name: "популярности (ASC)", sortProperty: "-rating" }, //выбранная сортировка
  onPage: 1, //выбранная страница
  searchValue: "", //поиск пиццы в строке поиска
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
    setPage: (state, action) => {
      state.onPage = action.payload + 1;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});
export const selectFilter = (state) => state.filterSlice;

export const { setActiveCat, setActiveSortBy, setPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
