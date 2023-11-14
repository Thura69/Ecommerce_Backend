import mongoose from "mongoose";
import { categoryDocument } from "../types/category.types";


const brandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index:true
    }
}, {
    timestamps:true
});



export const BrandModel = mongoose.model<categoryDocument>('brand', brandSchema);
