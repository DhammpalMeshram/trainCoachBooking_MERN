import axois from "axios";
import * as actionTypes from "../constants/productConstants";

// const url = "http://localhost:8000";
const url = "https://backendsupport.onrender.com";

// function to get current date
function getCurrentDate(separator=''){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}
export const currentDate = getCurrentDate();


// middleware api for getting all seats data and booking them
export const getAllProducts =(selectedDate, booking, selectedSeats)=> async(dispatch)=>{
    try{
        if(booking){ // this will get activated booking in occuring
            const res = await axois.post(`${url}/booktickets`,{date:selectedDate,numberOfSeats:selectedSeats});
            const {data} = res;
            console.log(res);

            dispatch({
                type:actionTypes.GET_PRODUCTS_SUCCESS,
                payload:data
            })
        }
        else{   // this will get activated data needed initially
            const res = await axois.post(`${url}/getalldata`,{date:selectedDate});
            const {data} = res;
            console.log(res);

            dispatch({
                type:actionTypes.GET_PRODUCTS_SUCCESS,
                payload:data
            })
        }
    }
    catch(err){
        dispatch({
            type:actionTypes.GET_PRODUCTS_FAIL,
            payload:err.message
        })
    }
}
