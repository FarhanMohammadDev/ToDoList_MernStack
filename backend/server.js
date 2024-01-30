import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import process from "process"
dotenv.config();
const app = express();
const port = 3000 ;

const {MONGODB_URL} = process.env;

mongoose.connect(MONGODB_URL)
        .then(() => console.log("Database connected"))
        .catch(err => console.log(err))

app.use(express.json());

app.get("/" , (req , res)=> {
    res.send("hello")
})
app.listen(port , () => {
    console.log("server started");
})
