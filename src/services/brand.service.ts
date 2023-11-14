import { Types } from "mongoose";
import { BrandModel } from "../models/brand.Model";



//create category
export const createBrandCategory = async (payload: string) => {
    try { 
        const category = await BrandModel.create(payload);
        return category;
    } catch (err: any) {
        throw new Error(err);
    }
};

//delete category
export const deleteBrandCategory = async (id:string) => {
    try {
        const category = await BrandModel.findByIdAndDelete(id);
        return category;
    } catch (err: any) {
        throw new Error(err);
    }
};

//update category
export const updateBrandCategory = async (id: string, payload: object) => {
    try {
        const updateCategory = await BrandModel.findByIdAndUpdate(id, payload, {
            new: true
        });
        return updateCategory;
    } catch (err: any) {
        throw new Error(err);
    }
};

//get all categories
export const getAllBrandCategories = async () => {
    try {
        const categories = await BrandModel.find();
        return categories
    } catch (err: any) {
        throw new Error(err);
    }
};

//get one category
export const getOneBrandCategory = async (id: string) => {
    try {
        const categories = await BrandModel.findById(id);
        return categories;
    } catch (err: any) {
        throw new Error(err);
    }
};

