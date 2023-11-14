import { NextFunction,Request,Response } from "express";
import { Fmsg, Smsg } from "../utils/Rmsg";
import { createCategory, deleteCategory, getAllCategories, getOneCategory, updateCategory } from "../services/category.service";
import { validateMongoDbId } from '../middlewares/validMongodbId';

//create category
export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await createCategory(req.body);
        if (!category) return Fmsg(res, "Category creation is failed", 201);
        return Smsg(res, "Category creation is successful!", category);
     } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//delete category
export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res,id);
        const category = await deleteCategory(id);
        if (!category) return Fmsg(res, "Category delete is failed", 201);
        return Smsg(res,"Category delete is successful!",category)

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
  }
};

//update category
export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await updateCategory(id, req.body);
        if (!category) return Fmsg(res, "Category update is failed", 201);
        return Smsg(res, "Category update is successful!", category);
    }catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//get all category
export const getAllCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await getAllCategories();
        if (!category) return Fmsg(res, "Category update is failed", 201);
        return Smsg(res, "Category update is successful!", category);
    }catch (e: any) {
        return Fmsg(res, e.message, 400);
    }  
};

//get on category
export const getOneCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await getOneCategory(id);
        if (!category) return Fmsg(res, "Category is not found!", 404);
        return Smsg(res, "Category is here", category);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
}