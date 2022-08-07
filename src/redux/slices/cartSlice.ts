import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcToTotalPrice } from '../../utils/calcToTotalPrice';

export type CartItem = {
	 id: number, 
	 imageUrl: string, 
	 title: string, 
	 type: string, 
	 size: number, 
	 price: number,
	 count: number
}

interface CartSliceState {
	totalPrice: number,
	items: CartItem[],
	sizes: number[],
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
  sizes: [26, 30, 40],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcToTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
				if(findItem) {
					findItem.count--;
					state.totalPrice -= findItem.price;
			}
    },
    removeItem(state, action: PayloadAction<number>) {
      const removeItem = state.items.find(
        (obj) => obj.id === action.payload
      );
			if(removeItem) {
				state.items = state.items.filter((obj) => obj.id !== action.payload);
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
