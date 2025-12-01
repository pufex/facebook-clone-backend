import express from "express"
import verifyJWT from "../middleware/verifyJWT.js"
import { 
    createComment, 
    deleteComment, 
    editComment, 
    getComments 
} from "../controllers/commentControllers.js"

const CommentRouter = express.Router()

CommentRouter.post("/:id", verifyJWT, createComment)
CommentRouter.patch("/:id", verifyJWT, editComment)
CommentRouter.delete("/:id", verifyJWT, deleteComment)
CommentRouter.get("/:id", getComments)

export default CommentRouter