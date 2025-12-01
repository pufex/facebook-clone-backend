import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import credentials from "./middleware/credentials.js"

import AuthRouter from "./routers/AuthRouter.js"
import UserRouter from "./routers/UserRouter.js"
import PostRouter from "./routers/PostRouter.js"
import CommentRouter from "./routers/CommentRouter.js"
import ImageUploadRouter from "./routers/ImageUploadRouter.js"

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(credentials)
app.use(cors({origin: "http://localhost:5173"}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/auth", AuthRouter)
app.use("/users", UserRouter)
app.use("/posts", PostRouter)
app.use("/comments", CommentRouter)
app.use("/images", ImageUploadRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database")
        app.listen(3003, () => {
            console.log("Listening to requests on port 3003")
        })
    })
    .catch(err => console.log(err))