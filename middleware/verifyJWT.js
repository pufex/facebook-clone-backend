import jwt from "jsonwebtoken"
import User from "../models/User.js"

export default function verifyJWT (req, res, next) {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.sendStatus(403)
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, encoded) => {
            if(err){
                return res.sendStatus(403)
            }

            const {_id: user_id} = encoded
            const user = await User.findById(user_id)
            if(!user){
                return res.sendStatus(403)
            }

            req.user = user
            next()
        }
    )
}

