import express from "express";
import Colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";

//dotenv config
dotenv.config();

//rest object
const app=express();

//midleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.get('/', (req, res)=>{
    res.status(200).send({
        Message:"server is running",
    });
});

//listen port
const port=process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white);
});