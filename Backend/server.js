import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config(); //load environment variables from a .env file into the process.env object

const app = express(); //sets up an Express application in Node.js


//middleware
app.use(express.json());  //allows us to accept JSON data in the req.body

//sets up an Express route to handle POST requests at the /products endpoint
app.post("/api/products",async (req,res) => {
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
    });


//async (req, res) => {: This is an asynchronous arrow function that will be executed when a GET request is made to the specified endpoint. req represents the incoming request, and res represents the response that will be sent back to the client.




//method sets up a route to handle HTTP GET requests
app.get("api/products",async(req, res)=>{
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
});

//sets up an Express route to handle DELETE requests for removing a product by its ID
app.delete("/api/products/:id" , async(req,res) => {
    const {id} = req.params; //Extract the product ID from the request parameters
    try {
        await Product.findByIdAndDelete(id); //Attempt to delete the product by ID
        res.status(200).json({success:true , message: "Product deleted"});
    }
    catch(error) {
        res.status(404).json({success : false , message: "Product not found"});
    }
});


console.log(process.env.MONGO_URI); //logs the value of environment variable MONGO_URI(it is used to store the connection string for a MongoDB database)

app.listen(5000 , () => {
    connectDB();
    console.log ('Server started at http://localhost:5000'); //Starts the server and makes it listen for incoming HTTP requests on port 5000
});

