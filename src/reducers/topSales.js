import {ADD_HIT_SUCCESS, ADD_HIT_REQUEST} from '../actions/actionTypes';

const initialState = {
    itemsHit: [],
    loaddingHit: true
}

export default function topSalesReducer (state = initialState, action) {
    switch(action.type) {
        case ADD_HIT_SUCCESS:
            const {itemsHit} = action.payload;
            return {...state, itemsHit: itemsHit, loaddingHit: false};
        case ADD_HIT_REQUEST:
            return {...state, loaddingHit: true};
        default:
            return state;
    }
}