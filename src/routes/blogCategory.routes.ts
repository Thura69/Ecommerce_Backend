import { Express } from "express";
import { validator } from "../middlewares/validator";
import { categorySchema } from "../schema/category.schema";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getOneCategoryController, updateCategoryController } from "../controller/category.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";
import { createBlogCategoryController, deleteBlogCategoryController, getAllBlogCategoryController, getOneBlogCategoryController, updateBlogCategoryController } from "../controller/BlogCategory.controller";

export const BlogCategory = (app: Express) => {
    //create Category 
    app.post('/api/blog-categories', validator(categorySchema), authMiddleware, createBlogCategoryController);
    
    //delete Category
    app.delete('/api/blog-categories/:id',authMiddleware,isAdmin,deleteBlogCategoryController);

    //update Category
    app.put('/api/blog-categories/:id', authMiddleware, isAdmin, updateBlogCategoryController);

    //get all Category
    app.get('/api/blog-categories', getAllBlogCategoryController);

    //get one category
    app.get('/api/blog-categories/:id', getOneBlogCategoryController);
};  