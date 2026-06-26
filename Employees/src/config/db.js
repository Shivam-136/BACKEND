import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/employees");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error in MongoDB:", error);
  }
};