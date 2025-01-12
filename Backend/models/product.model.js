import mongoose from "mongoose";

//To define a schema for a product using Mongoose, you'll need to specify the structure of the data you want to store
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);  //used to create a Mongoose model based on the defined schema

export default Product;