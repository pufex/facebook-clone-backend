import express from "express"
import { setBackgroundPicture, setProfilePicture } from "../controllers/userControllers"

const UserRouter = express.Router()

UserRouter.patch("/profile-picture/:id", setProfilePicture)
UserRouter.patch("/background-picture/:id", setBackgroundPicture)

export default UserRouter