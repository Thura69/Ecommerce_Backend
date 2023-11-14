import { Types } from "mongoose";
import { CategoryModel } from "../models/categoryModel";
import { Category } from "../routes/category.routes";

//create category
export const createCategory = async (payload: string) => {
    try { 
        const category = await CategoryModel.create(payload);
        return category;
    } catch (err: any) {
        throw new Error(err);
    }
};

//delete category
export const deleteCategory = async (id:string) => {
    try {
        const category = await CategoryModel.findByIdAndDelete(id);
        return category;
    } catch (err: any) {
        throw new Error(err);
    }
};

//update category
export const updateCategory = async (id: string, payload: object) => {
    try {
        const updateCategory = await CategoryModel.findByIdAndUpdate(id, payload, {
            new: true
        });
        return updateCategory;
    } catch (err: any) {
        throw new Error(err);
    }
};

//get all categories
export const getAllCategories = async () => {
    try {
        const categories = await CategoryModel.find();
        return categories
    } catch (err: any) {
        throw new Error(err);
    }
};

//get one category
export const getOneCategory = async (id:string) => {
    try {
        const categories = await CategoryModel.findById(id);
        return categories;
    } catch (err: any) {
        throw new Error(err);
    }
}

