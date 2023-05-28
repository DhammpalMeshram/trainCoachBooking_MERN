import "./Status.css";
import ChairIcon from '@mui/icons-material/Chair';

import {useState, useEffect} from "react";
import {useSelector} from "react-redux";


const Status = ()=>{
    const {products} = useSelector(state=>state.getProducts);
    const [displayBook, setDisplayBook] = useState(false);

    useEffect(()=>{
        if(products.bookedTicketNumber && products.bookedTicketNumber.length>0){
            setDisplayBook(true);
        }
        else setDisplayBook(false);

    },[products])


    return (
        <div id="status">
            <div className="statusRow available"> 
                <ChairIcon className="available"/>
                <span className="seatType">Available Seats</span>
                <span className="seatQty">{products?.seats.avalableSeats}</span>
            </div>
            <div className="statusRow booked"> 
                <ChairIcon/>
                <span className="seatType">Booked Seats</span>
                 <span className="seatQty">{products?.seats.bookedSeats}</span>
            </div>

            {/*Below code is deliberatly kept hidden to add fnctionality on deman}
            {/* <div className="statusRow ladies" > 
                <ChairIcon/>
                <span className="seatType">Booked by Lady</span>
                <span className="seatQty">{products?.seats.ladies}</span>
            </div>
            <div className="statusRow gents"> 
                <ChairIcon/>
                <span className="seatType">Books by gents</span>
                <span className="seatQty">{products?.seats.gents}</span>
            </div>
            <div className="statusRow other"> 
                <ChairIcon/>
                <span className="seatType">Books by other</span>
                <span className="seatQty">{products?.seats.other}</span>
            </div> */}
            {
                displayBook && products &&
            
            <div className="confiredDiv"> 
                <h3 style={{color:"voilet"}}>Congratulations!</h3>
                <h4>Your seat is booked</h4>
                <p>Seat Numbers are : {products?.bookedTicketNumber.join(" ")}</p>
            </div>
            }
        </div>

    )
}

export default Status;