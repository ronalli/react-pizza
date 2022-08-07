import { calcToTotalPrice } from "./calcToTotalPrice";

export const getCartFromLS = () => {
	const data = window.localStorage.getItem('cart');
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calcToTotalPrice(items)
	return {items, totalPrice}
}