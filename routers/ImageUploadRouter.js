import express from "express"
import verifyJWT from "../middleware/verifyJWT.js"
import { 
    CreateDeclaration,
    UploadChunk,
    getDeclaration,
    getChunk
} from "../controllers/ImageUploadControllers.js"

const ImageUploadRouter = express.Router()

ImageUploadRouter.post("/declaration", verifyJWT, CreateDeclaration)
ImageUploadRouter.post("/chunk/:id", verifyJWT, UploadChunk)
ImageUploadRouter.get("/declaration/:id", getDeclaration)
ImageUploadRouter.post("/chunk/get/:id", getChunk)

export default ImageUploadRouter