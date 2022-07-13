import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
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
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setActiveCategory } = filterSlice.actions;

export default filterSlice.reducer;
