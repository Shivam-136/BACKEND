import express from "express";
import { connectDb } from "./src/config/db.js";
import productRoutes from "./src/routes/product.router.js";

connectDb();

const app = express();

app.use(express.json());

app.use("/api/product", productRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});