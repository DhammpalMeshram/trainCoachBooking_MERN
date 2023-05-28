import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {checkDataAvailability, getCurrentDate} from "./defaultData.js";
import router from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 8000;

dotenv.config();
const app = express();

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("", router);

//function to connect database cloud
const dataBaseConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("Database is connected successfully");
        // checking data avialability in database
        let date = getCurrentDate();
        checkDataAvailability(date);
    }
    catch(err){
        console.log(err);
    }
}

// connetcting with database
dataBaseConnect();

app.listen(PORT, ()=>{
    console.log("server is running at port "+PORT);
})



