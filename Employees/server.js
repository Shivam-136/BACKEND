import express from "express";
import { connectDb } from "./src/config/db.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import cors from "cors";

connectDb();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});