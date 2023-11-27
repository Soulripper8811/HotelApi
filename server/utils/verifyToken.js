import jwt from "jsonwebtoken"
import {createError} from "./error.js"


export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"you are not authenicate"));
    }
    //jo bhi detail rehgi na vo aati he second permterlike apne case mein isadmin and id ayegi jo apun ne set kiye the
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(403,"token is not valid"));
        }
        //jo bhi info ayegi vo save ho jaygi like a varible
        // req.user ke alwa bhi koi name use kar sakte he 
        req.user=user;
        next()

    })

}

//verifyuser
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id==req.params.id|| req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403,"you are not authorized"));
        }
    })

}


//verifyadmin
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403,"you are not authorized"));
        }
    })

}