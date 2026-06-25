import mongoose from "mongoose"

const connentDb = async ()=>{
    try {
        await mongoose.connect("mongodb://0.0.0.0/employees")
        console.log("mongodb connected")
        
    } catch (error) {
        console.log("error in mongodb",error)
    }
}