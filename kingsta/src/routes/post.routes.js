import express from "express";
import { createPostController } from "../controllers/post.controller.js ";
import { upload } from "../config/multer";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = express.Router()

router.post("/create",authMiddleware, upload.array("images",5),createPostController)