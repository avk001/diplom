import { GET_ITEM_LOCALSTORAGE, SET_ITEM_LOCALSTORAGE } from "../actions/actionTypes";

const initialState = {
    data: ''
}

export default function localStorageReducer(state = initialState, action) {
    switch(action.type) {
    case SET_ITEM_LOCALSTORAGE:
        const {newKey, value} = action.payload;
        localStorage.setItem(newKey, value)
        return {...state}
    case GET_ITEM_LOCALSTORAGE:
        const {key} = action.payload;
        const keyValue = JSON.parse(localStorage.getItem(key));
        return {...state, data: keyValue}
    // case CLEAR_LOCALSTORAGE:
        
    // case REMOVE_ITEM_LOCALSTORAGE:
    
    default:
        return state;
    }
}