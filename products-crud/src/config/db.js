const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/products-crud"
    );

    console.log("mongodb connected");
    console.log("DB Name:", conn.connection.name);
    console.log("Collection:", mongoose.connection.collections);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;