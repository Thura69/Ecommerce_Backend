import mongoose from "mongoose";
import { BlogDocument } from "../types/blog.types";


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    numViews: {
        type: Number,
        default:0
    },
    isLiked: {
        type: Boolean,
        default:false
    },
    isDisLiked: {
        type: Boolean,
        default:false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    images: [],
    author: {
        type: String,
        default:"Admin"
    }
}, {
    toJSON: {
        virtuals:true
    },
    toObject: {
        virtuals:true
    },
    timestamps:true
});

export const BlogModel = mongoose.model<BlogDocument>('Blog', blogSchema);