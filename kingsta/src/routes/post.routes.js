import express from "express";
import { createPostController } from "../controllers/post.controller.js ";

const router = express.Router()

router.post("/create",createPostController)