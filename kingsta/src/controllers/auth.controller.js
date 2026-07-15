import UserModel from "../models/user.model"
import { sendFile } from "../services/storage.service"
import { generateToken } from "../utils/token"

const registerController = async (req, res) => {

    try {
        let { username, fullName, email, mobil, password, bio, dob } = req.body
        let file = req.file

        if (!username || !email || !password || !fullName) {
            return res.this.state(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const uploadFile = await sendFiles(file.buffer, file.originalname)

        const newUser = await UserModel.create({
            username,
            fullName,
            email,
            mobile,
            password,
            bio,
            dob,
            profile_pic: uploadFile.url,
        })

        const accessToken = generateToken(newUser.id, "15min")
        const refrshToken = generateToken(newUser.id, "1d")

        res.cookie("refeshToken", RefreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 1000,
        })

        res.cookie("refrenceToken", refrshToken,{
            httpOnly:true,
            maxAge:24*60*60*1000,
        })
        
        return res.status(201).json({
            success: true,
            message: "User registered",
            data: newUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error,
        })
    }
}