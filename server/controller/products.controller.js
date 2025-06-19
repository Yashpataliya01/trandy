import express from "express";
import cookieParser from "cookie-parser";
import Product from "../models/products.model.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) query.category = category;

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image, discountedPrice, category, tag } =
    req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      discountedPrice,
      category,
      tag: tag || "New",
    });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, image, discountedPrice, category, tag } =
    req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.image = image === null ? product.image : image; // Keep this logic if null is intentional
    product.discountedPrice = discountedPrice ?? product.discountedPrice;
    product.category = category ?? product.category;
    product.tag = tag ?? product.tag;

    await product.save();

    res.status(200).json(product); // Respond with updated product
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
