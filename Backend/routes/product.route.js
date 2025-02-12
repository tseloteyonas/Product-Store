import express from "express";
import {createProducts, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();


//sets up an Express route to handle POST requests at the /products endpoint
router.post("/",createProducts);

//method sets up a route to handle HTTP GET requests (fetchs all products from database)
router.get("/",getProducts);

//to update all the fields in products(we use patch instead of put when we only want to update some fields)
router.put("/:id", updateProduct);

//sets up an Express route to handle DELETE requests for removing a product by its ID
router.delete("/:id" , deleteProduct);

export default router;
