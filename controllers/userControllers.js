import User from "../models/User.js";
import ImageDeclaration from "../models/ImageDeclaration.js";

export const getUser = async (req, res) => {
    const user_id = req.params.id
    try{
        const user = await User.findById()
        res.json(user)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const setProfilePicture = async (req,res) => {
    const user_id = req.user._id
    const declaration_id = req.params.id
    try{
        const declaration = await ImageDeclaration.findById(user_id)
        if(!declaration){
            return res.sendStatus(404)
        }
        if(declaration.user_id !== user_id){
            return res.sendStatus(403)
        }
        await User.findByIdAndUpdate(
            user_id, 
            { profile_picture_id: declaration_id }
        )
        res.json(declaration)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const setBackgroundPicture = async (req, res) => {
    const declaration_id = req.params._id
    const user_id = req.user._id
    try{
        const declaration = await ImageDeclaration.findById(declaration_id)
        if(!declaration){
            return res.sendStatus(404)
        }
        if(declaration.user_id !== user_id){
            return res.sendStatus(403)
        }
        await User.findByIdAndUpdate(
            user_id, 
            { background_picture_id: declaration_id }
        )
        res.json(declaration)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}