import express from "express"
import { login, logout, refresh, register } from "../controllers/authControllers.js"

const AuthRouter = express.Router()

AuthRouter.post("/register", register)
AuthRouter.post("/login", login)
AuthRouter.get("/refresh", refresh)
AuthRouter.get("/logout", logout)

export default AuthRouter