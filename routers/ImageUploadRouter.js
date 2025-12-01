import express from "express"
import verifyJWT from "../middleware/verifyJWT.js"
import { 
    CreateDeclaration,
    UploadChunk,
    getDeclaration,
    getChunk
} from "../controllers/ImageUploadControllers"

const ImageUploadRouter = express.Router()

ImageUploadRouter.post("/declaration", verifyJWT, CreateDeclaration)
ImageUploadRouter.post("/chunk/:id", verifyJWT, UploadChunk)
ImageUploadRouter.get("/declaration/:id", getDeclaration)
ImageUploadRouter.get("/chunk/:id", getChunk)

export default ImageUploadRouter