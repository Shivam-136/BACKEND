import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { getMe, searctUser } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/getMe",authMiddleware,getMe)
router.patch("/update-profile",authMiddleware)
router.patch("searct",authMiddleware,searctUser) 

export default router