import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import ImageDeclaration from "../models/ImageDeclaration.js"
import ImageChunk from "../models/ImageChunk.js"
import {commentSchema} from "../zod/commentSchemas.js"

export const createComment = async (req, res) => {
    const user_id = req.user._id
    const post_id = req.params.id
    const result = commentSchema.safeParse(req.body)
    if(result.success === false){
        return res.sendStatus(400)
    }

    try{
        const post = await Post.findById(post_id)
        if(!post){
            return res.sendStatus(404)
        }
        const newComment = await Comment.create({
            ...result.data, 
            post_id, 
            user_id
        })
        res.json({...newComment, user: req.user})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const editComment = async (req, res) => {
    const comment_id = req.params.id
    const user_id = req.user._id
    const result = commentSchema.safeParse(req.body)
    if(result.success === false){
        return res.sendStatus(400)
    }

    try{
        const comment = await Comment.findById(comment_id)
        if(!comment){
            return res.sendStatus(404)
        }
        if(comment.user_id !== user_id){
            return res.sendStatus(403)
        }
        await Promise.all(result.data.pictures_ids.map(async (picture_id) => {
            if(!comment.pictures_ids.includes(picture_id)){
                await ImageDeclaration.findByIdAndDelete(picture_id)
                await ImageChunk.deleteMany({image_id: picture_id})
            }
        }))
        await Comment.findByIdAndUpdate(result.data)
        res.json({
            ...comment, 
            ...result.data, 
            user: req.user
        })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const deleteComment = async (req, res) => {
    const comment_id = req.params.id
    const user_id = req.user._id
    try{
        const comment = await Comment.findById(comment_id)
        if(!comment){
            return res.sendStatus(404)
        }
        if(comment.user_id !== user_id){
            return res.sendStatus(403)
        }
        await Promise.all(comment.pictures_ids.map(async (picture_id) => {
            await ImageDeclaration.findByIdAndDelete(picture_id)
            await ImageChunk.deleteMany({image_id: picture_id})
        }))
        await Comment.findByIdAndDelete(comment_id)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getComments = async (req, res) => {
    const post_id = req.params.id
    try{
        const comments = Comment.find({post_id})
        res.json(comments)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}