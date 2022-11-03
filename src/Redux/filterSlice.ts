import { RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TSortItem = {
  name: string;
  sortProperty: '-rating' | '-price' | '-name' | 'rating' | 'price' | 'name';
};

interface IFilterSliceState {
  categories: string[];
  sortBy: TSortItem[];
  activeCatogorie: number;
  activeSortBy: TSortItem;
  onPage: string;
  searchValue: string;
}

const initialState: IFilterSliceState = {
  categories: ['Все', 'Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'],
  sortBy: [
    { name: 'популярности (ASC)', sortProperty: '-rating' },
    { name: 'популярности (DESC)', sortProperty: 'rating' },
    { name: 'цене (ASC)', sortProperty: 'price' },
    { name: 'цене (DESC)', sortProperty: '-price' },
    { name: 'алфавиту (ASC)', sortProperty: 'name' },
    { name: 'алфавиту (DESC)', sortProperty: '-name' },
  ],
  activeCatogorie: 0, //выбранная категория
  activeSortBy: { name: 'популярности (ASC)', sortProperty: '-rating' }, //выбранная сортировка
  onPage: '1', //выбранная страница
  searchValue: '', //поиск пиццы в строке поиска
};

export const filterSlice = createSlice({
  name: 'filtres',
  initialState,
  reducers: {
    setActiveCat: (state, action: PayloadAction<number>) => {
      state.activeCatogorie = action.payload;
    },
    setActiveSortBy: (state, action: PayloadAction<TSortItem>) => {
      state.activeSortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.onPage = String(action.payload + 1);
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});
export const selectFilter = (state: RootState) => state.filterSlice;

export const { setActiveCat, setActiveSortBy, setPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
