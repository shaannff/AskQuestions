import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose  from "mongoose";
import cors from 'cors'
import userRoute from './Router/userRoute.js'
const app = express()
const PORT = process.env.PORT||7000

const target ={

    origin :process.env.FRONTENDURL||'http://localhost:5173',
    changeOrigin: true,
    credentials: true,
}

app.use(cors(target))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('db connected ')
}).catch((error)=>{
    console.log('error from the db',error)
})

app.use('/api/user',userRoute);
app.listen(PORT,()=>console.log('Server Running http://localhost:7000'))



