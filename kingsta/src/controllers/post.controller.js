import PostModel from "../models/post.model"
import { sendFiles } from "../services/storage.service"

export const createPostController = async (req, res) => {
    try {
        let { caption, location } = req.body

        if (!files)
            return res.status(400).json({
                success: false,
                message: "Media is required",
            })

            let uplodeImages = await Promise.all(
                file.map(async (elem) =>{
                    return await sendFiles(elem.buffer, elem.originalname)
                })
            )

            let newPost = await PostModel.create({
                caption,
                location,
                media_urls:uplodeImages.map((elem)=> elem.url)
            })

            return res.status(201).json({
                success:true,
                message:"Post created successfully",
                data:newPost,
            })
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error,
        })
    }
}