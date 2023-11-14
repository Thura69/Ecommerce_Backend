import mongoose from "mongoose";

export interface couponInput {
    name: string,
    expiry: Date,
    discount:number
};


export interface couponDocument extends couponInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date;
};