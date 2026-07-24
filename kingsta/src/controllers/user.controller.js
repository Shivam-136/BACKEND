import UserModel from "../models/user.model.js"

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select(-password)

        if (!user) return res.status(404).json({
            message: false,
            success: "User not found"
        })

        return res.status(200).json({
            success: true,
            message: "User found successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const updateProfile = async (req, res) => {
    const { username, fullName, mobile, dob, bio } = req.body

    const updateData = {}
    if (username) updateData.username = username
    if (fullName) updateData.fullName = fullName
    if (mobile) updateData.mobile = mobile
    if (dob) updateData.dob = dob
    if (bio) updateData.bio = bio

    const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, updateData, {
        new: true
    })

    if (!updatedUser) return res.status(400).json({
        success: false,
        message: "user not found"
    })

    return res.status(200).json({
        success: true,
        message: "user profile update successfully",
        updatedUser
    })
}

export const searctUser = async (req, res) => {
    const { query } = req.query

    if (!query)
        return res.status(400).json({
            success: false,
            message: "search query requred"
        })

    const user = await UserModel.find({
        $or: [
            { username: { "$regex": query, "$options": "i" } },
            { fullName: { "$regex": query, "$options": "i" } },
        ]
    }).select("username fullName profile_pic")

    if (user.length == 0)
        return res.status(404).json({
            success: false,
            message: "user not found",
        })

        return res.status(200).json({
            success:true,
            message:"user fatched successfully",
            user
        })
}