import mongoose from "mongoose";

// each day record structure
const seatSchema = new mongoose.Schema({
    generationDate:{type:String},
    data:{type:[Array]},
    avalableSeats:{type: Number},
    bookedSeats:{type: Number},
    gents:{type:Number},
    ladies:{type:Number},
    other:{type:Number},
    freeSeatsArray:{type:Object},
    id:{type:String},
    }
)

//Creating Collection
const Seats = mongoose.model("seat", seatSchema);
export default Seats;
