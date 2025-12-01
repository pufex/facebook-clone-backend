import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import credentials from "./middleware/credentials.js"

import AuthRouter from "./routers/AuthRouter.js"
import PostRouter from "./routers/PostRouter.js"

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(credentials)
app.use(cors({origin: "http://localhost:3003"}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/auth", AuthRouter)
app.use("/posts", PostRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database")
        app.listen(3003, () => {
            console.log("Listening to requests on port 3003")
        })
    })
    .catch(err => console.log(err))