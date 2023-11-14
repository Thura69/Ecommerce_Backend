import mongoose, { Types } from "mongoose";

export interface ProductInput {
    title: string,
    slug: string,
    description: string,
    price: number,
    category: Types.ObjectId,
    brand: 'Apple' | 'Samsung' | 'Lenovo',
    quantity?: number,
    sold?: number,
    images?: string[],
    color: 'Black' | 'Brown' | 'Red',
    ratings: Rating[],
    totalrating:string
};

interface Rating{
    star: number,
    comment:string,
    postedBy:Types.ObjectId
};

export interface ProductDocument extends ProductInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
};