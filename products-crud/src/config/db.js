const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://0.0.0.0/products-crud")
        console.log("mongodb connected")
    } catch (error) {
        console.log("Error is mongodb",error)
    }
}

module.exports = connectDB
