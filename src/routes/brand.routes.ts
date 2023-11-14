import { Express } from "express";
import { validator } from "../middlewares/validator";
import { categorySchema } from "../schema/category.schema";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";
import { createBrandCategoryController, deleteBrandCategoryController, getAllBrandCategoryController, getOneBrandCategoryController, updateBrandCategoryController } from "../controller/brand.controller";

export const Brand = (app: Express) => {
    //create Category
    app.post('/api/brands', validator(categorySchema), authMiddleware, createBrandCategoryController);
    
    //delete Category
    app.delete('/api/brands/:id',authMiddleware,isAdmin,deleteBrandCategoryController);

    //update Category
    app.put('/api/brands/:id', authMiddleware, isAdmin, updateBrandCategoryController);

    //get all Category
    app.get('/api/brands', getAllBrandCategoryController);

    //get one category
    app.get('/api/brands/:id', getOneBrandCategoryController);

};  