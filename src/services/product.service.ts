import { Request, Response, NextFunction } from "express";
import { productModel } from "../models/productModel";
import { ProductInput } from "../types/product.types";
import { Types } from "mongoose";

//create product
export const createProduct = async (obj:ProductInput) => {
     try {
         const product = await productModel.create(obj);
         return product;
    } catch (err: any) {
        throw new Error(err);
    }
};

//get a product
export const getaProduct = async (payload: string) => {
    try {
        const product = await productModel.findById(payload);
        return product;
    } catch (err: any) {
        throw new Error(err);
    }
};

//getall
export const getAllProducts = async () => {
    try {
        const products = await productModel.find();
        return products;
    } catch (err: any) {
        throw new Error(err)
    }
};

//update products
export const updateProducts = async (id:string,payload:object) => {
    try {
        const products = await productModel.findByIdAndUpdate(id, payload, {
            new:true
        });
        return products;
    } catch (err: any) {
        throw new Error(err)
    }
};


//delete products
export const deleteProduct = async (id: string) => { 
     try {
        const products = await productModel.findByIdAndDelete(id);
        return products;
    } catch (err: any) {
        throw new Error(err)
    }
};

//add rating
export const addRating = async (userId: string, productId: string,start:number,comment:string) => {
    try {
        const product = await productModel.findByIdAndUpdate(productId, {
            $push: {
                ratings: {
                    star: start,
                    comment:comment,
                    postedBy: userId
                }
            }
        }, {
            new:true
        }).populate('ratings.postedBy');
        return product;
    } catch (err: any) {
        throw new Error(err);
    }
};

//update rating
export const updateRating = async (payload: object, star: string, comment: string) => {
    try {
        const product = await productModel.updateOne({
            ratings: { $elemMatch: payload }
        }, {
            $set: { 'ratings.$.star': star, 'ratings.$.comment': comment }
        });

        return product;
    } catch (err: any) {
        throw new Error(err);
    }
};

