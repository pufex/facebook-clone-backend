import ImageChunk from "../models/ImageChunk.js";
import ImageDeclaration from "../models/ImageDeclaration.js";
import {ImageChunkSchema, ImageDeclarationSchema} from "../zod/imageSchemas.js"

export const CreateDeclaration = async (req, res) => {
    const user_id = req.user._id
    const result = ImageDeclarationSchema.safeParse(req.body)
    if(!result.success){
        return res.sendStatus(400)
    }
    try{
        const declaration = await ImageDeclaration.create({
            ...result.data,
            user_id
        })
        res.json(declaration)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const UploadChunk = async (req, res) => {
    const image_id = req.params.id
    const user_id = req.user.id
    console.log(user_id)
    const result = ImageChunkSchema.safeParse(req.body)
    if(!result.success){
        return res.sendStatus(400)
    }
    const {chunkNumber} = result.data
    try{
        const declaration = await ImageDeclaration.findById(image_id)
        if(!declaration){
            return res.sendStatus(404)
        }
        if(declaration.user_id !== user_id){
            console.log(declaration.user_id)
            console.log("I am here!!!")
            return res.sendStatus(403)
        }
        const existingChunk = await ImageChunk.findOne({
            chunkNumber,
            image_id: declaration._id
        })
        if(existingChunk){
            return res.sendStatus(409)
        }
        const newChunk = await ImageChunk.create({
            ...result.data,
            image_id: image_id
        })
        res.json(newChunk)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}

export const getDeclaration = async (req, res) => {
    const declaration_id = req.params.id
    try{
        const declaration = await ImageDeclaration.findById(declaration_id)
        if(!declaration){
            return res.sendStatus(404)
        }
        res.json(declaration)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getChunk = async (req, res) => {
    const declaration_id = req.params.id
    const {chunkNumber} = req.body
    try{
        const declaration = await ImageDeclaration.findById(declaration_id)
        if(!declaration){
            return res.sendStatus(404)
        }
        const chunk = await ImageChunk.findOne({
            image_id: declaration_id,
            chunkNumber
        })
        if(!chunk){
            return res.sendStatus(404)
        }
        res.json(chunk)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}