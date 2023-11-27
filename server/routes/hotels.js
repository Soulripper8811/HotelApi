import express from "express"
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controller/hotel.js"
import {verifyAdmin} from "../utils/verifyToken.js"

// import { createError } from "../utils/error.js"
const router=express.Router()

//create
router.post("/",verifyAdmin,createHotel);

// update
router.put("/:id",verifyAdmin,updateHotel);

//Delete hotel
router.delete("/:id",verifyAdmin,deleteHotel);

//get hotel
router.get("/:id",getHotel);

//getall hotel
router.get("/",getAllHotel);



export default router