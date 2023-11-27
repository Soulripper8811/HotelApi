import Hotel from "../models/Hotel.js";

//create
export const createHotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body)
    try {
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        // res.status(500).json(err)
        next(err);
    }
}

//update
export const updateHotel=async(req,res,next)=>{
    try {
        const updateHotel= await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}) 
        res.status(200).json(updateHotel)
    } catch (err) {
        // res.status(500).json(err)
        next(err);
    }
}

//delete
export const deleteHotel=async(req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id) 
        res.status(200).json("hotel is deleted")
    } catch (err) {
        // res.status(500).json(err)
        next(err);
    }
}

//gethotel
export const getHotel=async(req,res,next)=>{
    try {
        const hotel =await Hotel.findById(req.params.id) 
        res.status(200).json(hotel)
    } catch (err) {
        // res.status(500).json(err)
        next(err);
    }
}

//getallhotel
export const getAllHotel=async(req,res,next)=>{
    try {
        const hotel =await Hotel.find() 
        res.status(200).json(hotel)
    } catch (err) {
        // res.status(500).json(err)
        next(err)
    }
}

