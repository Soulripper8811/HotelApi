import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser"
dotenv.config()




const app=express()
app.use(cors())

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongo")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongo db is disconnected")
})
// mongoose.connection.on("connected",()=>{
    //     console.log("mongo db is connected")
    // })
    
//middleware
app.use(cookieParser())
app.use(express.json())
    
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/room",roomsRoute)


app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})






app.listen(8800,()=>{
    connect()
    console.log("server running on 3001");
})
