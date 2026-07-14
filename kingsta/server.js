import dotenv from "dotenv"
dotenv.config()
import app from "./src/app.js"
import { connectDB } from "./src/config/db.js"

connectDB()

const POST = process.env.port || 4000

app.listen(POST ,()=>{
    console.log(`server is running on port ${POST}`)
})