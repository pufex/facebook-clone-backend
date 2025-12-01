import express from "express"
import { 
    createPost, 
    deletePost, 
    editPost, 
    getPost, 
    getPostsPage 
} from "../controllers/postControllers.js"
import verifyJWT from "../middleware/verifyJWT.js"

const PostRouter = express.Router()

PostRouter.post("/", verifyJWT, createPost)
PostRouter.patch("/:id", verifyJWT, editPost)
PostRouter.delete("/:id", verifyJWT, deletePost)
PostRouter.get("/all/:page", getPostsPage)
PostRouter.post("/:id", getPost)

export default PostRouter