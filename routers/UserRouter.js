import express from "express"
import { 
    getUser,
    setBackgroundPicture, 
    setProfilePicture 
} from "../controllers/userControllers.js"

const UserRouter = express.Router()

UserRouter.get("/:id", getUser)
UserRouter.patch("/profile-picture/:id", setProfilePicture)
UserRouter.patch("/background-picture/:id", setBackgroundPicture)

export default UserRouter