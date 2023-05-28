import express from "express";
import { getAllDataController, bookSeatController} from "../controllers/seatController.js";

const router = express.Router();

// for getting initial booking status
router.post("/getalldata", getAllDataController);
//for booking tickets
router.post("/booktickets", bookSeatController);

export default router;
