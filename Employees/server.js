import express from "express"
import { connectdb } from "./src/config/db.js"
import cors from "cors"

connectdb()
const app = express()

app.use(
    cors({
        origin:"http://localhost:5173"
    })
)

app.use(express.json())

app.use("api/employees")


app.listen(3000,() => {
    console.log("server is running on port 3000")
})