import mongoose from "mongoose"

const ImageDeclarationSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    chunksAmount: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

const ImageDeclaration = mongoose.model("Declaration", ImageDeclarationSchema)

export default ImageDeclaration