import express from "express"
import { PrismaClient } from "@prisma/client"
import UserRouter from "./routes/UserRoutes"
const app = express()

const PORT:number = 3000
app.use(express.json())
app.use('/user',UserRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})

app.listen(PORT,()=>{
    console.log('server listening on PORT: '+PORT);
})