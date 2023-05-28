import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { getAllProductsReducer} from "./reducers/productReducer";

//combining middleware
const reducer = combineReducers({
    getProducts : getAllProductsReducer,
})

//applying middleware
const middleware = [thunk];

//creating store
const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;

