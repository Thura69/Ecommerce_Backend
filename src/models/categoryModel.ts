import mongoose from "mongoose";
import { categoryDocument } from "../types/category.types";


const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index:true
    }
}, {
    timestamps:true
});



export const CategoryModel = mongoose.model<categoryDocument>('category', categorySchema);
