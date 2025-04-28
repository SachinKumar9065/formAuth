import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js'

dotenv.config()
const app = express();

app.use(bodyParser.json());
app.use(cors());

//user router
app.use('/api', userRouter);

//product router
app.use('/product', productRouter);

app.get('/', (req, res)=>{
    res.send("hello sachin")
});

mongoose.connect(process.env.MONGO_URL,{
    dbName:"Auth_Db"
}).then(()=>console.log("mongoDb is connected")).catch((error)=>console.log(error));

const port = process.env.PORT;
app.listen(port, ()=>console.log(`server is running on port ${port}`))