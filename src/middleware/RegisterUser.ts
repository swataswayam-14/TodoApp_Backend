import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import zod from "zod"

const prisma = new PrismaClient()

const SignUpBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstname:zod.string(),
    lastname:zod.string().optional()
})

const RegisterUser = async(req:Request, res:Response, next: NextFunction)=>{
    const {success}:any = SignUpBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:'Incorrect inputs'
        })
    }
    const username:string = req.body?.username;
    const password:string = req.body?.password;
    const firstname:string = req.body?.firstname;
    const lastname:string = req.body?.lastname;

    // const isAlreadyExists:any = prisma.user.findFirst({
    //     where:{
    //         username
    //     }
    // })
    // if(isAlreadyExists){
    //     return res.status(401).json({
    //         msg:'User already exists'
    //     })
    // }
    try {
        const user = await prisma.user.create({
            data:{
                username,
                password,
                firstname,
                lastname
            }
        })
        console.log(user);
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:'There is some problem'
        })
    }
}

export default RegisterUser