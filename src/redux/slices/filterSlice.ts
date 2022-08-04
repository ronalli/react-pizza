import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum Sort {
	RATING = 'rating',
	PRICE = 'price',
	TITLE = 'title'
}


export type SortItem = {
	title: string,
	sortProperty: Sort
}

interface FilterSliceState {
	categoryId: number,
	sort: SortItem,
	sortFields: SortItem[],
	categories: string[],
	searchValue: string
}


const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    title: 'популярности',
    sortProperty: Sort.RATING,
  },
  sortFields: [
    { title: 'популярности', sortProperty: Sort.RATING },
    { title: 'цене', sortProperty: Sort.PRICE },
    { title: 'алфавиту', sortProperty: Sort.TITLE },
  ],
  categories: [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ],
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortItem>) => {
      state.sort = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setActiveCategory, setSort, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;