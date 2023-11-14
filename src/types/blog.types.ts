import mongoose, { Types } from "mongoose";

export interface BlogInput {
    title: String,
    description: String,
    category: String,
    numViews: number,
    isLiked: boolean,
    isDisLiked: boolean,
    likes: Types.ObjectId[],
    dislikes: Types.ObjectId[],
    image: String,
    author:String
};


export interface BlogDocument extends BlogInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
};