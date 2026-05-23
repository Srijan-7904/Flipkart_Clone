import * as actionTypes from '../constants/cartConstants';

export const addToCart = (id, quantity) => async (dispatch) => {
    try { 
        const URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${URL}/product/${id}`);
        const data = await response.json();
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });
    } catch (error) {
        console.log('Error while calling cart API');
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