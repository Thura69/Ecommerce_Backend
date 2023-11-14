import mongoose from "mongoose";

export interface cartInput  {
    products: [{ product: mongoose.Types.ObjectId, count: number, color: string, price: number }],
    cartTotal: number,
    totalAfterDiscount: number,
    orderBy:mongoose.Types.ObjectId
};

export interface cartDocument extends cartInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
};

