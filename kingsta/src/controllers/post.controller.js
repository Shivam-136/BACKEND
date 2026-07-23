import PostModel from "../models/post.model.js"
import { sendFiles } from "../services/storage.service.js"

export const createPostController = async (req, res) => {
    try {
        let { caption, location } = req.body

        if (!files)
            return res.status(400).json({
                success: false,
                message: "Media is required",
            })

        let uplodeImages = await Promise.all(
            file.map(async (elem) => {
                return await sendFiles(elem.buffer, elem.originalname)
            })
        )

        let newPost = await PostModel.create({
            caption,
            location,
            media_urls: uplodeImages.map((elem) => elem.url)
        })

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost,
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error,
        })
    }
}

export const getAllPostController = async (req, res) => {
    try {

        let allposts = await PostModel.find()

        return res.status(200).json({
            success: true,
            message: "All posts fatched",
            data: allPosts,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const UpdatePostController = async (req, res) => {
    try {
        let post_id = req.perams.id

        if (!req.body)
            return res.status(400).json({
                success: false,
                message: "Fielda are required"
            })

        let updatePost = await PostModel.findByIdAndUpdate(
            post_id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        )

        return res.status(200).json({
            success: true,
            message: "post updated",
            data: updatePost,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}