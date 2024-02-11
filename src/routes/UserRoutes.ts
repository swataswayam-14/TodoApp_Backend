import { Request, Response, NextFunction } from "express";
import express from "express"
import RegisterUser from "../middleware/RegisterUser";
import LoginUser from "../middleware/LoginUser";
import { PrismaClient } from "@prisma/client";
import AddTodo from "../middleware/AddTodo";

const prisma = new PrismaClient()
const UserRouter = express.Router()



//signUp route
UserRouter.post('/register',RegisterUser,(req: Request, res: Response)=>{
    res.send('<h1>Welcome to the Todo Application page</h1>')
})

UserRouter.post('/login',LoginUser,(req: Request, res: Response)=>{
    res.status(200).send('<h1>Welcome to the Todo Application page</h1>')
})
UserRouter.get('/gettodo',async(req:Request,res:Response)=>{
    const userId:number = req.body?.userId
    if(userId){
        const allTodo = await prisma.todo.findMany({
            where:{
                userId
            }
        })
        return res.status(200).json({
            todo:allTodo
        })
    }else{
        return res.status(411).json({
            msg:'Invalid inputs'
        })
    }
})

UserRouter.post('/addtodo',AddTodo,(req: Request, res: Response)=>{
    res.status(200).json({
        msg:'The todo added successfully'
    })
})
export default UserRouter