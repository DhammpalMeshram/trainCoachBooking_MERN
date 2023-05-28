import Seats from "../modules/seats.js"
import {checkDataAvailability} from "../defaultData.js";

//controller which return all data at initial phase
export const getAllDataController = async (req, res)=>{
    try{
        let date = req.body.date;
        let seats = await Seats.findOne({generationDate:date});

        if(!seats){
            await checkDataAvailability(date);
        }
        seats = await Seats.findOne({generationDate:date});
        res.status(200).json({seats,bookedTicketNumber:[]});
    }
    catch(err){
        console.log("error occured", err);
        res.status(500).json({message:err.message});
    }
}


//function to update booking data
export const bookSeatController = async (req, res)=>{
    try{
        // getting all the data
        let todaysDate = req.body.date;
        let seatsTOBook = req.body.numberOfSeats;
        let seatNumbers = seatsTOBook;
        let bookedTicketNumber = [];

        // bringbing dataCopy from backend
        let seatData  = await Seats.findOne({generationDate:todaysDate})
        console.log(seatData);
        let newSeatData = {};

        //check for number of seats with help of freeSeatsArrays
        let {freeSeatsArray} = seatData;
        let toProceedFurther = true;

        // loop to check number of seats availability in at which row
        for (const key in freeSeatsArray) {
            //if free seats are available in array
            if (freeSeatsArray[key] >= seatsTOBook && toProceedFurther){
                
                //capture the row number in which seats are available
                let ArrayIndex = key;
                
                //capture targetedArray from database
                const targetedArray = seatData.data[ArrayIndex];
                let newArray = [];

                // building new row with updated value of seat ocuupation
                for(let i=0; i<targetedArray.length; i++){
                    if(targetedArray[i].seatType==='availabel' && seatsTOBook >0){
                        let newObject = {...targetedArray[i],
                            seatType: "booked",
                        }
                        bookedTicketNumber.push(targetedArray[i].id);
                        newArray.push(newObject);
                        seatsTOBook--;
                    }
                    else newArray.push(targetedArray[i]);
                }

                // at this point i have one complete row,
                // update that row entirely in the array
                    let ArrayToUpdate = seatData.data;
                    ArrayToUpdate[ArrayIndex] = newArray;

                    let bookedSeats = Number(seatData.bookedSeats)+Number(seatNumbers);

                    //updating the values for free seats array
                    const freeSeatsArray = {...seatData.freeSeatsArray};
                    freeSeatsArray[ArrayIndex] -= seatNumbers;
                    
                    //setting all updation together
                    newSeatData = {
                        'freeSeatsArray':freeSeatsArray,
                        'data': ArrayToUpdate,
                        'avalableSeats': +seatData.avalableSeats-seatNumbers,
                        'bookedSeats': bookedSeats,
                    };

                    //if more seats are needed to fill
                    if(seatsTOBook>0) {
                         //updating the value;
                        await Seats.findOneAndUpdate({generationDate:todaysDate},{...newSeatData})
                        
                        //keeping process continue
                        toProceedFurther = true;
                    }
                    //terminaiting the process
                    else toProceedFurther = false;
            }
        }
        //updating lastly
        await Seats.findOneAndUpdate({generationDate:todaysDate},{...newSeatData})

        //getting final ressponce 
        let seats = await Seats.findOne({generationDate:todaysDate});

        ///if seats are available but not together scattered all over the length thwn only below code helps
        if(seatsTOBook !=0 && seats.avalableSeats>= seatsTOBook){
            let {freeSeatsArray} = seats;

            for (const key in freeSeatsArray) {
                //if free seats are available in array
                if (freeSeatsArray[key] != 0 && seatsTOBook >0){
                    
                    //capture the row number in which seats are available
                    let ArrayIndex = key;

                    findAndUpdateSeat(seatData, ArrayIndex,seatsTOBook,bookedTicketNumber, newSeatData ,seatNumbers )
                
                    //capture targetedArray from database
                    const targetedArray = seatData.data[ArrayIndex];
                
                    let newArray = [];

                    // building new row with updated value of seat ocuupation
                    for(let i=0; i<targetedArray.length; i++){
                        if(targetedArray[i].seatType==='availabel' && seatsTOBook >0){
                            let newObject = {...targetedArray[i],
                                seatType: "booked",
                            }
                            bookedTicketNumber.push(targetedArray[i].id);
                            newArray.push(newObject);
                            seatsTOBook--;
                        }
                        else newArray.push(targetedArray[i]);
                    }

                    // at this point i have one complete row,
                        //update the data
                        let ArrayToUpdate = seatData.data;
                        ArrayToUpdate[ArrayIndex] = newArray;

                        let bookedSeats = Number(seatData.bookedSeats)+Number(seatNumbers);
                        
                        //updating the values for free seats array
                        const freeSeatsArray = {...seatData.freeSeatsArray};
                        freeSeatsArray[ArrayIndex] -= seatNumbers;
                        
                        //setting all updation together
                        newSeatData = {
                            'freeSeatsArray':freeSeatsArray,
                            'data': ArrayToUpdate,
                            'avalableSeats': +seatData.avalableSeats-seatNumbers,
                            'bookedSeats': bookedSeats,
                        };

                        //if more seats are needed to fill
                        await Seats.findOneAndUpdate({generationDate:todaysDate},{...newSeatData})
                }
            }
            seats = await Seats.findOne({generationDate:todaysDate});
            // seats.bookedTicketNumber = bookedTicketNumber;

        }        
        res.status(200).json({seats, bookedTicketNumber:bookedTicketNumber});
    }
    catch(err){
        console.log("data fetch failed "+err.message);
    }
}

