export const getCartFromLS = () => {
	const data = window.localStorage.getItem('cart');
	return data ? JSON.parse(data) : [];
}