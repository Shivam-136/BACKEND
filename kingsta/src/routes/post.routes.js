import express from "express";
import { createPostController  , getAllPostController , UpdatePostController} from "../controllers/post.controller.js ";
import { upload } from "../config/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/create",authMiddleware, upload.array("images",5),createPostController)
router.get("/",getAllPostController)
router.post("/update/:id",authMiddleware,UpdatePostController)
 
export default router