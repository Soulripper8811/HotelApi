import express from "express"
import {updateUser,deleteUser,getUser,getAllUser} from "../controller/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router=express.Router()

// understanding purpose
// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("you are logged in user")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user you are logged in and you can delete your acoounts")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin, you are logged in and you can delete all acoounts")
// })




// update
router.put("/:id",verifyUser,updateUser);

//Delete hotel
router.delete("/:id",verifyUser,deleteUser);

//get hotel
router.get("/:id",verifyUser,getUser);

//getall hotel
router.get("/",verifyAdmin,getAllUser);


export default router