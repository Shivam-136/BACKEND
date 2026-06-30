const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/Auth");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in mongodb", error);
  }
};

module.exports = connectDB;
  