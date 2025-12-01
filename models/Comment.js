import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    body: {
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

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment