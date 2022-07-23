import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzaStatus = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { category, sort, searchValue } = params;
    const { data } = await axios.get(
      `http://localhost:3001/data?${category}&_sort=${sort}&_order=desc&title_like=${searchValue}`
    );
    return data;
  }
);

export const fetchItemPizza = createAsyncThunk(
  'pizza/fetchItemPizza',
  async (params) => {
    const { id } = params;
    console.log(id);
    const { data } = await axios.get(`http://localhost:3001/data/${id}`);
    return data;
  }
);

const initialState = {
  items: [],
  item: '',
  status: '',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzaStatus.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzaStatus.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzaStatus.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
    [fetchItemPizza.fulfilled]: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
