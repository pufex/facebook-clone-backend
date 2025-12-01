import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {registerSchema, loginSchema} from "../zod/authSchemas.js"

export const register = async (req, res) => {
    const result = registerSchema.safeParse(req.body)
    if(result.success === false){
        return res.sendStatus(400)
    }
    const {email, password} = result.data

    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.sendStatus(409)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            ...result.data, 
            password: hashedPassword
        })
        await newUser.save()
        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const login = async (req, res) => {
    const result = loginSchema.safeParse(req.body)
    if(result.success === false){
        return res.sendStatus(400)
    }
    const {email, password} = result.data

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.sendStatus(409)
        }
        const isMatching = await bcrypt.compare(password, user.password)
        if(!isMatching){
            return res.sendStatus(409)
        }
        const payload = {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        }
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "7d"}
        )
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1h"}
        )
        res.cookie("facebook", refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: true})
        res.json({user, accessToken})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}