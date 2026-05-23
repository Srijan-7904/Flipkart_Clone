import * as actionTypes from '../constants/cartConstants';
import { products } from '../../constant/data';

export const addToCart = (id, quantity) => (dispatch) => {
    try { 
        const product = products.find(p => p.id === id);
        if (product) {
            dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...product, quantity } });
        } else {
            console.error('Product not found in local data');
        }
    } catch (error) {
        console.log('Error while adding to cart');
    }
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    });
};

export const updateCartQuantity = (id, quantity) => (dispatch) => {
    dispatch({
        type: actionTypes.UPDATE_CART_QUANTITY,
        payload: { id, quantity }
    });
};