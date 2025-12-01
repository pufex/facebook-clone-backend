import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, 
    pictures_ids: {
        type: [String],
        default: []
    },
    liked_by: {
        type: [String],
        default: []
    }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema)

export default Post