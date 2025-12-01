import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {registerSchema} from "../zod/authSchemas.js"

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