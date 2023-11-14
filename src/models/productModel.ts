import mongoose, { Mongoose } from "mongoose";
import { ProductDocument } from "../types/product.types";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    brand: { 
        type: String,
        enum:['Apple','Samung','Lenovo']
    },
    quantity: {
        type: Number,
        required: true,
        default:0
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type:Array
    },
    color: {
        type: String,
        enum:['Black','Brown','Red'],
    },
    ratings: [{
        star: Number,
        comment:String,
        postedBy:{  type: mongoose.Schema.Types.ObjectId,ref:"user"}
    }],
    totalrating: {
        type: String,
        default:0
    }
}, { 
    timestamps:true
});

export const productModel = mongoose.model<ProductDocument>('Products', productSchema);