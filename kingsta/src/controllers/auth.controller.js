import UserModel from "../models/user.model.js";
import { sendFiles } from "../services/storage.service.js";
import { generateToken } from "../utils/token.js";

export const registerController = async (req, res) => {
  try {
    const { username, fullName, email, mobile, password, bio, dob } = req.body;
    const file = req.file;

    if (!username || !fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const uploadFile = await sendFiles(file.buffer, file.originalname);

    const newUser = await UserModel.create({
      username,
      fullName,
      email,
      mobile,
      password,
      bio,
      dob,
      profile_pic: uploadFile.url,
    });

    const accessToken = generateToken(newUser._id, "15min");
    const refreshToken = generateToken(newUser._id, "1d");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isExisted = await UserModel.findOne({ email });

    if (!isExisted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkPass = await isExisted.comparePass(password);

    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateToken(isExisted._id, "15min");
    const refreshToken = generateToken(isExisted._id, "1d");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: isExisted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};