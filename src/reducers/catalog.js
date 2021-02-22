import {ADD_CATALOG_SUCCESS, ADD_CATALOG_REQUEST, ADD_CATEGORIES_SUCCESS, ADD_NEXT_ITEMS_SUCCESS, FETCH_CATEGORY_ITMES_SUCCSESS, FETCH_CATEGORY_ITMES_REQUEST, SET_SEARCH_TEXT, SET_REDIRECT_SEARCH, ADD_NEXT_ITEMS_REQUEST} from '../actions/actionTypes';

const initialState = {
    categories: [],
    itemsHit: [],
    itemsAll: [],
    loaddingHit: null,
    nextItemsLength: null,
    offset: null,
    currentCategory: null,
    loaddingCatalog: null,
    textSearch: {text: '', redirect: false}
}

export default function catalogReducer (state = initialState, action) {
    switch(action.type) {
        case ADD_CATALOG_SUCCESS:
            const {items} = action.payload;
            return {...state, itemsAll: items, currentCategory: null, nextItemsLength: items.length, offset: items.length, loaddingCatalog: false}
        case ADD_CATALOG_REQUEST:
            return {...state, loaddingCatalog: true}
        case ADD_CATEGORIES_SUCCESS:
            const {categories} = action.payload;
            return {...state, categories: categories};
        case ADD_NEXT_ITEMS_REQUEST:
                return {...state, loaddingCatalog: true}
        case ADD_NEXT_ITEMS_SUCCESS:
            const {nextItems} = action.payload;
            return {...state, itemsAll: [...state.itemsAll, ...nextItems], nextItemsLength: nextItems.length, offset: state.offset + 6, loaddingCatalog: false};
        case FETCH_CATEGORY_ITMES_SUCCSESS: 
            const {categoryItems} = action.payload;
            return {...state, itemsAll: categoryItems, nextItemsLength: categoryItems.length, offset: categoryItems.length, loaddingCatalog: false}
        case FETCH_CATEGORY_ITMES_REQUEST:
            const {id} = action.payload;
            return {...state, currentCategory: id, loaddingCatalog: true}
        case SET_SEARCH_TEXT:
            const {text} = action.payload;
            return {...state, textSearch: {...state.textSearch, text: text}}
        case SET_REDIRECT_SEARCH:
            const {toggle} = action.payload;
            return {...state, textSearch: {...state.textSearch, redirect: toggle}}
        default:
            return state;
    }
}