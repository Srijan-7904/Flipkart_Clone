import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(product => product.id === item.id);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.id === existItem.id ? { ...x, quantity: (x.quantity || 1) + 1 } : x)
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, { ...item, quantity: item.quantity || 1 }] };
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(product => product.id !== action.payload)
            };

        case actionTypes.UPDATE_CART_QUANTITY:
            const { id, quantity } = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map(x =>
                    x.id === id ? { ...x, quantity: Math.max(1, quantity) } : x
                )
            };

        case actionTypes.CART_RESET:
            return { cartItems: [] };

        default:
            return state;
    }
};