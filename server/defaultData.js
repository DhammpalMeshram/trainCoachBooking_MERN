import Seats from "./modules/seats.js";
import DateRecord from "./modules/dateRecord.js";

// function to get current date
export function getCurrentDate(separator=''){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}


//function to check that data is generated or not for today date
// if data is already there it will not dublicate it but if data
// is not there it will create data in database
// it helps in automatic data generation dailly

export const checkDataAvailability = async(todaysDate)=>{
    try{
        // await DateRecord.deleteMany();
        // await Seats.deleteMany();
        let checkDate = await DateRecord.find({date:todaysDate});
        if(checkDate.length) {
            console.log("date is found returning from here");
            return;
        }
        else {
            console.log("generating the data")
            generateData(todaysDate);
        }
    }
    catch(err){
        console.log(err);
        return;
    }
}


//function to generate all seats data automatically
const generateData = (todaysDate)=>{
    const seatArrayObject = [];
    let rowArray = [];
    let index = 1;
    for(let rows=1; rows<=12; rows++){
        rowArray =[]
        for(let seats = 1; seats<=8; seats++){
            if(rows===12 && seats===4) break;
            rowArray.push({id:seats===4?"":index++, seatType: seats===4?"hiddend":"availabel", rowNumber:rows, bookedBy:"none"});
        }
        seatArrayObject.push(rowArray);
    }
    console.log("data is generated successfully");
    storeDefaultData(seatArrayObject, todaysDate);
}


//function to store that data in the MongoDB
const storeDefaultData = async (data, todaysDate)=>{
    try{
        console.log("Storing Data in DataBase "+"for date "+todaysDate);
        let newSeatsData = new Seats({
                id:todaysDate,
                generationDate:todaysDate, 
                data:data,
                avalableSeats:80,
                bookedSeats:0,
                gents:0,
                ladies:0,
                other:0,
                freeSeatsArray:{"0":7,"1":7, "2":7, "3":7,"4":7, "5":7,'6':7,'7':7,'8':7,'9':7,'10':7,"11":3}
            })
        await newSeatsData.save();
        let newDate = new DateRecord({date:todaysDate})
        await newDate.save();
        console.log("Data inserted Successfully");
        // let seats = await Seats.findOne({generationDate:todaysDate});
        // res.status(200).json({seats,bookedTicketNumber:[]});
    }
    catch(err){
        console.log("data insertion failed "+err);
    }
};

