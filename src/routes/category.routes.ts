import { Express } from "express";
import { validator } from "../middlewares/validator";
import { categorySchema } from "../schema/category.schema";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getOneCategoryController, updateCategoryController } from "../controller/category.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";

export const Category = (app: Express) => {
    //create Category
    app.post('/api/products-categories', validator(categorySchema), authMiddleware, createCategoryController);
    
    //delete Category
    app.delete('/api/products-categories/:id',authMiddleware,isAdmin,deleteCategoryController);

    //update Category
    app.put('/api/products-categories/:id', authMiddleware, isAdmin, updateCategoryController);

    //get all Category
    app.get('/api/products-categories', getAllCategoryController);

    //get one category
    app.get('/api/products-categories/:id', getOneCategoryController);

};  