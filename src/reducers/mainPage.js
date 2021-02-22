// import {ADD_HIT_SUCCESS, ADD_HIT_REQUEST} from '../actions/actionTypes';

// const initialState = {
//     itemsHit: [],
//     loaddingHit: null
// }

// export default function mainPageReducer (state = initialState, action) {
//     switch(action.type) {
//         case ADD_HIT_SUCCESS:
//             const {itemsHit} = action.payload;
//             return {...state, itemsHit: itemsHit, loadingHit: false};
//         case ADD_HIT_REQUEST:
//             return {...state, loadingHit: true};
//         default:
//             return state;
//     }
// }