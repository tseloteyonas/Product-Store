import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js"

dotenv.config(); //load environment variables from a .env file into the process.env object

const app = express(); //sets up an Express application in Node.js

//middleware
app.use(express.json());  //allows us to accept JSON data in the req.body

app.use("/api/products",productRoutes);
console.log(process.env.MONGO_URI); //logs the value of environment variable MONGO_URI(it is used to store the connection string for a MongoDB database)

app.listen(5000 , () => {
    connectDB();
    console.log ('Server started at http://localhost:5000'); //Starts the server and makes it listen for incoming HTTP requests on port 5000
});

