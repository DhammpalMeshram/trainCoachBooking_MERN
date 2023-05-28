import mongoose from "mongoose";

// scema to maintain date record
const dateRecordSchema = new mongoose.Schema({
    date:{type: String},
})

//Creating Collection
const DateRecord = mongoose.model("dateRecord", dateRecordSchema);
export default DateRecord;
