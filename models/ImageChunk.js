import mongoose from "mongoose"

const ImageChunkSchema = new mongoose.Schema({
    image_id: {
        type: String,
        required: true,
    },
    chunkNumber: {
        type: Number,
        required: true,
    },
    data: {
        type: String,
        required: true,
    }
})

const ImageChunk = mongoose.model("Chunk", ImageChunkSchema)

export default ImageChunk