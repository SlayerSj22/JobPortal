// const express= require('express')//old way

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import { companyRouter } from "./routes/company.route.js";
import { jobRouter } from "./routes/job.route.js";
import { applicationRouter } from "./routes/application.route.js";

dotenv.config({});


const app= express();

// middlewares

app.get("/home",(req,res)=>{
    res.status(200).json({
        message:"i'm coming from backend",
        success:true
    })
})

//  


app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));




//main server part

const PORT= process.env.PORT || 3000;



app.listen(PORT,()=>{
    connectDB()
    console.log(`server running at port ${PORT}`);

    
})

app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)


