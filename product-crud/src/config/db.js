import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/ctest");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error in MongoDB:", error);
  }
};