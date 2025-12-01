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
    const user_id = req.user._id
    const result = ImageChunkSchema.safeParse(req.body)
    if(!result.success){
        return res.sendStatus(400)
    }
    const {chunkNumber} = result.data
    try{
        const declaration = ImageDeclaration.findById(image_id)
        if(!declaration){
            return res.sendStatus(404)
        }
        if(declaration.user_id !== user_id){
            return res.sendStatus(403)
        }
        const existingChunk = ImageChunk.findOne({chunkNumber})
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
