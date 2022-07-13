import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    title: 'популярности',
    sortProperty: 'rating',
  },
  sortFields: [
    { title: 'популярности', sortProperty: 'rating' },
    { title: 'цене', sortProperty: 'price' },
    { title: 'алфавиту', sortProperty: 'title' },
  ],
  categories: [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setActiveCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;
