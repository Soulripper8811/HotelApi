import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import {createError} from "../utils/error.js"



export const createRoom=async (req,res,next)=>{
    const hotelId=req.params.hotelid;
    const newRoom=await new Room(req.body)
    try {
        const savedRoom= await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})

        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(err);
    }

}


//update
export const updateRoom=async(req,res,next)=>{
    try {
        const updateRoom= await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}) 
        res.status(200).json(updateRoom)
    } catch (err) {
        // res.status(500).json(err)
        next(err);
    }
}

//delete
export const deleteRoom=async(req,res,next)=>{
    try {
        await Room.findByIdAndDelete(req.params.id) 
        res.status(200).json("Room is deleted")
    } catch (err) {
        // res.status(500).json(err)
        next(err);
    }
}

//getroom
export const getRoom=async(req,res,next)=>{
    try {
        const room =await Room.findById(req.params.id) 
        res.status(200).json(room)
    } catch (err) {
        // res.status(500).json(err)
        next(err);
    }
}

//getallroom
export const getAllRoom=async(req,res,next)=>{
    try {
        const room =await Room.find() 
        res.status(200).json(room)
    } catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}
