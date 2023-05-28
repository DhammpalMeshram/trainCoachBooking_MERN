import * as actionTypes from "../constants/productConstants";

const intialState = {loading:true, products:{seats:[]}}

// reducer for getProduct Api
export const getAllProductsReducer =(state = intialState, action)=>{
    switch(action.type){
        case actionTypes.GET_PRODUCTS_SUCCESS :
            return {loading:false, products:action.payload}

        case actionTypes.GET_PRODUCTS_FAIL:
            return {loading: false, product:[], error:action.payload};

        default : return state;
    }
}


