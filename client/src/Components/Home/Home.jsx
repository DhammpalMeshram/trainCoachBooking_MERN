import "./Home.css";

import VehicalContainer from "./VehicalContainer/VehicalContainer";
import BookingOptions from "./BookOptions/BookOPtions";
import Coach from "./Coach/Coach";
import Status from "./Status/Status";


const Home = ()=>{
    return (
        <div id="container">
            <VehicalContainer/>
            <div id="bookingContainer">
                <BookingOptions/>
                <Coach/>
                <Status/>                
            </div>
        </div>
    )
}

export default Home;