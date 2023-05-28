import "./VehicalContainer.css";

import DirectionsSubwayFilledIcon from '@mui/icons-material/DirectionsSubwayFilled';
import FlightIcon from '@mui/icons-material/Flight';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

const vehicalContainer = ()=>{
    return(
        <div id="vehicalContainer">
            <div className="vehicalType selected">
                <DirectionsSubwayFilledIcon/>
                <span>Trains</span>
            </div>
            <div className="vehicalType">
                <FlightIcon/>
                <span>Flights</span>
            </div>
            <div className="vehicalType">
                <DirectionsBusIcon/>
                <span>Bus</span>
            </div>
        
            <div className="vehicalType">
                <AirplaneTicketIcon/>
                <span>International Flights</span>
            </div>
        </div>
    )
}

export default vehicalContainer;