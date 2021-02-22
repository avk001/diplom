import {ADD_TO_CART, REDIRECT_TO_CART, REMOVE_FROM_CART, SET_CART_QUANTITY} from '../actions/actionTypes';

const initialState = {
    quantity: 0,
    redirect: false,
    owner: {
        phone: '',
        address: ''
    }
}

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            return {...state, quantity: state.quantity + 1}
        case REMOVE_FROM_CART:
            return {...state, quantity: state.quantity - 1}
        case REDIRECT_TO_CART:
            const {value} = action.payload;
            return {...state, redirect: value}
        case SET_CART_QUANTITY:
            const {amount} = action.payload;
            return {...state, quantity: amount}
        default:
            return state
    }
}