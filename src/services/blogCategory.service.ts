import { Types } from "mongoose";
import { BlogCategoryModel } from "../models/blogCategoryModel";


//create category
export const createBlogCategory = async (payload: string) => {
    try { 
        const category = await BlogCategoryModel.create(payload);
        return category;
    } catch (err: any) {
        throw new Error(err);
    }
};

//delete category
export const deleteBlogCategory = async (id:string) => {
    try {
        const category = await BlogCategoryModel.findByIdAndDelete(id);
        return category;
    } catch (err: any) {
        throw new Error(err);
    }
};

//update category
export const updateBlogCategory = async (id: string, payload: object) => {
    try {
        const updateCategory = await BlogCategoryModel.findByIdAndUpdate(id, payload, {
            new: true
        });
        return updateCategory;
    } catch (err: any) {
        throw new Error(err);
    }
};

//get all categories
export const getAllBlogCategories = async () => {
    try {
        const categories = await BlogCategoryModel.find();
        return categories
    } catch (err: any) {
        throw new Error(err);
    }
};

//get one category
export const getOneBlogCategory = async (id: string) => {
    try {
        const categories = await BlogCategoryModel.findById(id);
        return categories;
    } catch (err: any) {
        throw new Error(err);
    }
};

