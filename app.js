import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database")
        app.listen(3003, () => {
            console.log("Listening to requests on port 3003")
        })
    })
    .catch(err => console.log(err))