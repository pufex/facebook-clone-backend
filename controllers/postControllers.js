import Post from "../models/Post.js"
import {postSchema} from "../zod/postSchemas.js"
import User from "../models/User.js"
import ImageDeclaration from "../models/ImageDeclaration.js"
import ImageChunk from "../models/ImageChunk.js"

export const createPost = async (req, res) => {
    const result = postSchema.safeParse(req.body)
    if(result.success === false){
        return res.sendStatus(400)
    }
    
    try{
        const post = new Post({
            ...result.data,
            user_id: req.user._id
        })
        await post.save()
        const user = await User.findById(user_id)
        res.json({...post, user})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const editPost = async (req, res) => {
    const result = postSchema.safeParse(req.body)
    if(!result.success){
        return res.sendStatus(400)
    }

    const post_id = req.params.id
    const user_id = req.user._id
    try{
        const post = await Post.findById(post_id)
        // Check if its user's post.
        if(post.user_id !== user_id){
            return res.sendStatus(403)
        }
        // Delete pictures that are no longer in the post
        await Promise.all(result.data.pictures_ids.map(async (picture_id) => {
            if(!post.pictures_ids.contains(picture_id)){
                await ImageDeclaration.findByIdAndDelete(picture_id)
                await ImageChunk.deleteMany({image_id: picture_id})
            }
        }))
        await Post.findByIdAndUpdate(post_id, result.data)
        const user = await User.findById(req.user._id)
        res.json({...post, ...result.data, user})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const deletePost = async (req, res) => {
    const post_id = req.params.id
    try{
        const post = await Post.findByIdAndDelete(post_id)
        await Promise.all(post.pictures_ids.map(async (picture_id) => {
            await ImageDeclaration.findByIdAndDelete(picture_id)
            await ImageChunk.deleteMany({image_id: picture_id})
        }))
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
