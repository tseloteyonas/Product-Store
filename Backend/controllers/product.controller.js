import Product from "../models/product.model.js";
import mongoose from "mongoose";

//async (req, res) => {: This is an asynchronous arrow function that will be executed when a GET request is made to the specified endpoint. req represents the incoming request, and res represents the response that will be sent back to the client.

export const getProducts = async(req, res)=>{
    try {
        const products = await Product.find({}); //calls the find method on the Product model,
                                                 //which retrieves all documents from the "products" collection 
                                                 //in the MongoDB database. The await keyword is used because this
                                                 //is an asynchronous operation, ensuring that the code waits for
                                                 //the promise to resolve before continuing.
        res.status(200).json({success:true , data: products});
    } catch (error) {
       console.log("error in fetching products:", error.message);
       res.status(500).json({success: false , message: "Server Error"}); 
    }
}

export const createProducts = async (req,res) => {
    const product = req.body;//user will send this data 
    if (!product.name|| !product.price || !product.image){
        return res.status(400).json({success:false , message: "Please provide all fields"});
    }

    const newProduct = new Product(product)  //used to create a new instance of the Product model in Mongoose.
    
    try{
        await newProduct.save(); //save the newly created instance of the Product model to thedatabase
        res.status(201).json({success: true, data:newProduct}); //used to send a JSON response back to the client after successfully creating a new product

    } catch (error){
        console.error("Error in Create product:" ,error.message);
        res.status(500).json({success: false , message: "Server Error"});
    }
    }


export const updateProduct = async(req,res)=>{
        const { id } = req.params; //extracts the id parameter from the request parameters (i.e., the product ID from the URL)
        const product = req.body; //assigns the body of the incoming request (which should contain the updated product data) to the variable product.
    
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false, message:"Invalid Product Id"});
        }
    
        try{
            const updatedProduct = await Product.findByIdAndUpdate(id, product , {new:true}); //This line uses the findByIdAndUpdate method from a MongoDB model (presumably Mongoose) to find the product by its ID and update it with the new data provided in product.
                                                                                             // The await keyword pauses the execution until the promise returned by findByIdAndUpdate resolves.
                                                                                            // The { new: true } option tells Mongoose to return the updated document rather than the original document.
    
            res.status(200).json({success: true, data: updatedProduct});
        } catch(error){
            res.status(500).json({success: false, message: "Server Error"});
        }
    }

export const deleteProduct = async(req,res) => {
    const {id} = req.params; //Extract the product ID from the request parameters
    try {
        await Product.findByIdAndDelete(id); //Attempt to delete the product by ID
        res.status(200).json({success:true , message: "Product deleted"});
    }
    catch(error) {
        console.log("error in deleting product:" , error.message);
        res.status(404).json({success : false , message: "Product not found"});
    }
}