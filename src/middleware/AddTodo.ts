import { Request, Response, NextFunction } from "express";
import zod, { string } from "zod"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const AddTodoBody = zod.object({
    title: zod.string(),
    description: zod.string().optional(),
    userId : zod.number()
})
const AddTodo = async(req:Request, res:Response,next:NextFunction)=>{
    const {success}:any = AddTodoBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: 'invalid inputs'
        })
    }
    const title:string = req.body?.title
    const description:string = req.body?.description
    const userId:number = req.body?.userId

    const todo = await prisma.todo.create({
        data:{
            title,
            description,
            userId
        }
    })
    console.log(todo);
    next()
}

export default AddTodo