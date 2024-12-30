
import { JWT_PASSWORD } from "./secrets.js";
import { Request, Response,NextFunction } from 'express';
import  jwt from "jsonwebtoken";
 
 declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }


export default function Userauth(req:Request,res:Response,next:NextFunction){
    interface decoded {
        id:string}
    
        const token = req.headers["token"];
        if(!token){
            res.status(400).json({
                message:"token is empty!!"
            })
            
        }
        const decode=  jwt.verify(token as string, JWT_PASSWORD) as decoded
    try{
        if (decode)  {
            
           req.userId=decode.id
           next()
        }
    }catch(e){
        
           return res.status(403).json({
                message: "You are not signed in!!"
            })
        
    
    }
}