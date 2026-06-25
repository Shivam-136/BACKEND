const express = require("express");
const connectDB = require("./src/config/db");
const ProductModel = require("./src/models/product.model");

connectDB();

const app = express();

app.use(express.json());

// CREATE PRODUCT
app.post("/api/product/create", async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      imageUrl,
      currency,
      amount,
    } = req.body;

    const newProduct = await ProductModel.create({
      productName,
      description,
      category,
      imageUrl,
      price: {
        currency,
        amount,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Product created",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET ALL PRODUCTS
app.get("/api/product", async (req, res) => {
  try {
    const allProducts = await ProductModel.find();

    return res.status(200).json({
      success: true,
      message: "All products fetched",
      data: allProducts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET SINGLE PRODUCT
app.get("/api/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched",
      data: product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// UPDATE PRODUCT
app.patch("/api/product/update/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// DELETE PRODUCT
app.delete("/api/product/delete/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted",
      data: deletedProduct,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});