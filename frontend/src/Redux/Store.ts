import { combineReducers, createStore } from "redux";

import { productsReducer } from "./ProductsState";

const reducers = combineReducers({ productsState: productsReducer });



const store = createStore(reducers);

export default store;
