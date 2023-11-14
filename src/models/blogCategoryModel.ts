import mongoose from "mongoose";
import { categoryDocument } from "../types/category.types";


const blogCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index:true
    }
}, {
    timestamps:true
});



export const BlogCategoryModel = mongoose.model<categoryDocument>('blog-category', blogCategorySchema);
