import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const LoginUser = async(req:Request, res:Response, next:NextFunction)=>{
    const username:string = req.body?.username
    const password:string = req.body?.password
    const userExists:any = await prisma.user.findFirst({
        where:{
            username,
            password
        }
    })
    if(userExists){
        next()
    }else{
        return res.status(403).json({
            msg:'Invalid credentials'
        })
    }
}

export default LoginUser