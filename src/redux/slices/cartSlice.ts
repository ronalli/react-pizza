import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
	 id: number, 
	 imageUrl: string, 
	 title: string, 
	 types: number[], 
	 sizes: number[], 
	 price: number,
	 count: number
}

interface CartSliceState {
	totalPrice: number,
	items: CartItem[],
	sizes: number[],
}


const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  sizes: [26, 30, 40],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => (sum += obj.price * obj.count),
        0
      );
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if(findItem) {
				if (findItem.count === 1) {
					state.items = state.items.filter((obj) => obj.id !== action.payload.id);
				} else {
					findItem.count--;
				}
      state.totalPrice -= findItem.price;
		}
    },
    removeItem(state, action) {
      const removeItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );
			if(removeItem) {
				state.items = state.items.filter((obj) => obj.id !== action.payload.id);
				state.totalPrice = state.totalPrice - removeItem.price * removeItem.count;
			}
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearCart, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
