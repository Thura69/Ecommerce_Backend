import { NextFunction,Request,Response } from "express";
import { Fmsg, Smsg } from "../utils/Rmsg";
import { createCategory, deleteCategory, getAllCategories, getOneCategory, updateCategory } from "../services/category.service";
import { validateMongoDbId } from '../middlewares/validMongodbId';
import { createBlogCategory, deleteBlogCategory, getAllBlogCategories, getOneBlogCategory, updateBlogCategory } from "../services/blogCategory.service";
import { createBrandCategory, deleteBrandCategory, getAllBrandCategories, getOneBrandCategory, updateBrandCategory } from "../services/brand.service";

//create category
export const createBrandCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await createBrandCategory(req.body);
        if (!category) return Fmsg(res, "Brand Category creation is failed", 201);
        return Smsg(res, "Brand Category creation is successful!", category);
     } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//delete category
export const deleteBrandCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res,id);
        const category = await deleteBrandCategory(id);
        if (!category) return Fmsg(res, "Brand Category delete is failed", 201);
        return Smsg(res,"Brand Category delete is successful!",category)

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
  }
};

//update category
export const updateBrandCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await updateBrandCategory(id, req.body);
        if (!category) return Fmsg(res, "Category update is failed", 201);
        return Smsg(res, "Category update is successful!", category);
    }catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//get all category
export const getAllBrandCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await getAllBrandCategories();
        if (!category) return Fmsg(res, "Brands not found", 201);
        return Smsg(res, "Brands are here!", category);
    }catch (e: any) {
        return Fmsg(res, e.message, 400);
    }  
};

//get on category
export const getOneBrandCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await getOneBrandCategory(id);
        if (!category) return Fmsg(res, "Brand is not found!", 404);
        return Smsg(res, "Brand is here", category);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};
