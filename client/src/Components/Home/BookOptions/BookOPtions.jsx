import "./BookOptions.css";
import {useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getAllProducts } from "../../../redux/actions/productActions";
import { currentDate } from "../../../redux/actions/productActions";

import TextField from '@mui/material/TextField'

const BookingOptions = ()=>{
    const {products} = useSelector(state=>state.getProducts);
    const dispatch = useDispatch();
    const [seats, setSeats] = useState(1);
    const [selectedDate, setSelectedDate] =useState(currentDate);

    // function to put limit on max number of seat selected
    const onSeatNumberChange = (e)=>{
        if(e.target.value >7){
            alert("Maximum 7 seats are allowed to book at a time");
            return;
        }
        else setSeats(e.target.value);
    }

    // function to dispatch book ticket action
    const onBookTicketClick = async()=>{
        if(products?.seats.avalableSeats ===0){
            alert("Sorry all tickets are booked");
        }
        else if(products?.seats.avalableSeats <seats){
            alert("Booking fail, less Number of Seats available");
        }
        else dispatch(getAllProducts(selectedDate, true, seats));
    }

    // function to get seat data for selected seats
    const createDateForQuery=(e)=>{
        let value = e.target.value;
        let newDate = "";

        for(let i=0; i<value.length; i++){
            if(value.charAt(i)==="-")continue;
            else newDate += value.charAt(i);
        }

        dispatch(getAllProducts(newDate, false, seats));
        setSelectedDate(newDate);
    }

    return(
        <div id="bookOptions">
            <TextField 
                id="standard-basic" 
                label="From" 
                variant="standard"
            />
            <TextField 
                id="standard-basic" 
                label="To" 
                variant="standard" 
            />
            <TextField 
                id="standard-basic" 
                variant="standard" 
                type="date"  
                style={{marginTop:"15px"}} 
                onChange={createDateForQuery}
            />
            <TextField 
                id="standard-basic" 
                label="Enter Number of Seats" 
                variant="standard" 
                value={seats} 
                onChange={onSeatNumberChange} 
                type="number"
            />
            <div id="genderOptions"> 
                <input type="radio" name="gender" value="male" id="male"/>
                <label htmlFor="male">Male</label>
                <input type="radio" name="gender" value="female" id="female"/>                    
                <label htmlFor="female">Female</label>
                <input type="radio" name="gender" vlaue="other" id="other"/>
                <label htmlFor="other">Other</label>
            </div>
            <button onClick ={onBookTicketClick}>Book Ticket</button>
        </div>
    )
}

export default BookingOptions;
