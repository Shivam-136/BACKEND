require("dotenv").config();

const express = require("express");
const postRoutes = require("./src/router/post.router");

const app = express();

app.use("/api/post", postRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});