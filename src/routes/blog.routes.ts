import { Express } from "express"
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";
import { createBlogController, deleteOnBlogController, disLikeBlogController, getAllBlogsController, getOneBlogController, likeBlogController, updateBlogController, uploadImagesBlogController } from "../controller/blog.controller";
import { validator } from "../middlewares/validator";
import { blogLikeSchema, blogSchema } from "../schema/blog.schema";
import { blogImgResize, uploadPhoto } from "../middlewares/uploadImages";

export const Blog = (app: Express) => {
    
    //create blog
    app.post('/api/blogs/', authMiddleware, validator(blogSchema), isAdmin, createBlogController);

    //upload images
    app.put('/api/blogs/images-upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images',10),blogImgResize,uploadImagesBlogController)
    
    //update blog
    app.patch('/api/blogs/:id', authMiddleware, isAdmin, updateBlogController);

    //get blog by id
    app.get('/api/blogs/:id', authMiddleware, getOneBlogController);

    //get blogs
    app.get('/api/blogs', getAllBlogsController);

    //get one blog
    app.delete('/api/blogs/:id', authMiddleware, deleteOnBlogController);

    //Like blog
    app.post('/api/blogs/like-blog', authMiddleware, validator(blogLikeSchema), likeBlogController);
    
    //Dislike blog
    app.post('/api/blogs/dislike-blog', authMiddleware, validator(blogLikeSchema), disLikeBlogController);

};