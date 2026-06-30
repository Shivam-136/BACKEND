// GET    => Server se data fetch (read) karne ke liye use hota hai.
// POST   => Server par naya data send/create karne ke liye use hota hai.
// PATCH  => Existing data ka kuch specific part update karne ke liye use hota hai.
// DELETE => Existing data ko delete karne ke liye use hota hai.
// PUT    => Existing data ko completely update/replace karne ke liye use hota hai.


const express = require("express");
const app = express();

app.use(express.json());

// GET => Fetch data
app.get("/users", (req, res) => {
    res.json({
        success: true,
        message: "All users fetched successfully",
    });
});

// POST => Create new data
app.post("/users", (req, res) => {
    const user = req.body;

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
    });
});

// PUT => Completely update/replace data
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    res.json({
        success: true,
        message: `User ${id} replaced successfully`,
        data: updatedUser,
    });
});

// PATCH => Partially update data
app.patch("/users/:id", (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    res.json({
        success: true,
        message: `User ${id} updated successfully`,
        data: updatedFields,
    });
});

// DELETE => Delete data
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    res.json({
        success: true,
        message: `User ${id} deleted successfully`,
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});