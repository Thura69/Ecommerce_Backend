import mongoose, { Mongoose } from "mongoose";

export interface categoryInput {
  title:String
};

export interface categoryDocument extends categoryInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
};