import {ADD_CATALOG_SUCCESS, ADD_CATALOG_REQUEST, ADD_CATALOG_ERROR, ADD_CATEGORIES_SUCCESS, ADD_CATEGORIES_REQUEST, ADD_HIT_SUCCESS, ADD_HIT_REQUEST, ADD_NEXT_ITEMS_SUCCESS, ADD_NEXT_ITEMS_REQUEST, FETCH_CATEGORY_ITMES_SUCCSESS, FETCH_CATEGORY_ITMES_REQUEST, SET_SEARCH_TEXT, SET_REDIRECT_SEARCH, ADD_TO_CART, REMOVE_FROM_CART, REDIRECT_TO_CART, SET_CART_QUANTITY, SET_ITEM_LOCALSTORAGE, GET_ITEM_LOCALSTORAGE, CLEAR_LOCALSTORAGE, REMOVE_ITEM_LOCALSTORAGE} from './actionTypes';

export function addCatalogSuccess(items) {
    return {type: ADD_CATALOG_SUCCESS, payload: {items}}
}

export function addCatalogRequst() {
    return {type: ADD_CATALOG_REQUEST}
}

export function addCatalogError() {
    return {type: ADD_CATALOG_ERROR}
}

export function addCategoriesSuccess(categories) {
    return {type: ADD_CATEGORIES_SUCCESS, payload: {categories}}
}

export function addCategoriesRequest() {
    return {type: ADD_CATEGORIES_REQUEST}
}

export function addHitSuccess(itemsHit) {
    return {type: ADD_HIT_SUCCESS, payload: {itemsHit}}
}

export function addHitRequest() {
    return {type: ADD_HIT_REQUEST}
}

export function addNextItemsSuccess(nextItems) {
    return {type: ADD_NEXT_ITEMS_SUCCESS, payload: {nextItems}}
}

export function addNextItemsRequest() {
    return {type: ADD_NEXT_ITEMS_REQUEST}
}

export function fetchCategoryItemsSuccess(categoryItems) {
    return {type: FETCH_CATEGORY_ITMES_SUCCSESS, payload: {categoryItems}}
}

export function fetchCategoryItemsRequest(id) {
    return {type: FETCH_CATEGORY_ITMES_REQUEST, payload: {id}}
}

export function setSearchText(text = '') {
    return {type: SET_SEARCH_TEXT, payload: {text}}
}

export function setRedirectSearch(toggle) {
    return {type: SET_REDIRECT_SEARCH, payload: {toggle}}
}

export function addToCart() {
    return {type: ADD_TO_CART}
}

export function removeFromCart() {
    return {type: REMOVE_FROM_CART}
}

export function setCartQuantity(amount) {
    return {type: SET_CART_QUANTITY, payload: {amount}}
}

export function redirectToCart(value) {
    return {type: REDIRECT_TO_CART, payload: {value}}
}

export function setItemLocalStorage(key, value) {
    return {type: SET_ITEM_LOCALSTORAGE, payload: {key, value}}
}

export function getItemLocalStorage(key) {
    return {type: GET_ITEM_LOCALSTORAGE, payload: {key}}
}

export function clearLocalStorage() {
    return {type: CLEAR_LOCALSTORAGE}
}

export function removeItemLocalStorage(key) {
    return {type: REMOVE_ITEM_LOCALSTORAGE, payload: {key}}
}