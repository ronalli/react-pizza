import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzaStatus = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { category, sort, searchValue } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `http://localhost:3001/data?${category}&_sort=${sort}&_order=desc&title_like=${searchValue}`
    );
    return data;
  }
);

export const fetchItemPizza = createAsyncThunk<PizzaItem, Record<string, string>>(
  'pizza/fetchItemPizza',
  async (params) => {
    const { id } = params;
    const { data } = await axios.get<PizzaItem>(`http://localhost:3001/data/${id}`);
    return data;
  }
);

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface PizzaSliceState {
	items: PizzaItem[],
	item: PizzaItem | Record<string, never>,
	status: Status
}

export type PizzaItem = {
	id: number, 
	imageUrl: string, 
	title: string, 
	types: number[], 
	sizes: number[], 
	price: number,
	count: number
}

const initialState: PizzaSliceState = {
  items: [],
  item: {},
  status: Status.LOADING,
};


export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
	extraReducers: (builder) => {
		builder.addCase(fetchPizzaStatus.pending, (state) => {
			state.status = Status.LOADING;
      state.items = [];
		});
		builder.addCase(fetchPizzaStatus.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
			state.items = action.payload;
      state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzaStatus.rejected, state => {
			state.status = Status.ERROR;
      state.items = [];
		});
		builder.addCase(fetchItemPizza.fulfilled, (state, action: PayloadAction<PizzaItem>) => {
			state.item = action.payload;
		});
	}
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
