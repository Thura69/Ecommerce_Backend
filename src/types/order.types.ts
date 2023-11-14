import mongoose from "mongoose";

export interface orderInput {
    products: [{
        product: mongoose.Types.ObjectId,
        count: number,
        color:string
    }],
    paymentIntent: object,
    orderStatus: string[],
    orderBy:mongoose.Types.ObjectId
};

export interface orderDocument extends orderInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
};