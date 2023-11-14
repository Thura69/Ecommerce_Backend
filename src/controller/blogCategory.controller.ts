import { NextFunction,Request,Response } from "express";
import { Fmsg, Smsg } from "../utils/Rmsg";
import { createCategory, deleteCategory, getAllCategories, getOneCategory, updateCategory } from "../services/category.service";
import { validateMongoDbId } from '../middlewares/validMongodbId';
import { createBlogCategory, deleteBlogCategory, getAllBlogCategories, getOneBlogCategory, updateBlogCategory } from "../services/blogCategory.service";

//create category
export const createBlogCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await createBlogCategory(req.body);
        if (!category) return Fmsg(res, "Category creation is failed", 201);
        return Smsg(res, "Category creation is successful!", category);
     } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//delete category
export const deleteBlogCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res,id);
        const category = await deleteBlogCategory(id);
        if (!category) return Fmsg(res, "Category delete is failed", 201);
        return Smsg(res,"Category delete is successful!",category)

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
  }
};

//update category
export const updateBlogCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await updateBlogCategory(id, req.body);
        if (!category) return Fmsg(res, "Category update is failed", 201);
        return Smsg(res, "Category update is successful!", category);
    }catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//get all category
export const getAllBlogCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await getAllBlogCategories();
        if (!category) return Fmsg(res, "Category update is failed", 201);
        return Smsg(res, "Category update is successful!", category);
    }catch (e: any) {
        return Fmsg(res, e.message, 400);
    }  
};

//get on category
export const getOneBlogCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await getOneBlogCategory(id);
        if (!category) return Fmsg(res, "Category is not found!", 404);
        return Smsg(res, "Category is here", category);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};
