import { Request,Response,NextFunction } from "express";
import { validateMongoDbId } from "../middlewares/validMongodbId";
import { Fmsg, Smsg } from "../utils/Rmsg";
import { createBlog, deleteOneBlog, findBlogAndUpdate, findBlogById, getAllBlogs, incrementBlogView, pullDislikeBlog, pullLikeBlog, pushDislikeBlog, pushLikeBlog } from "../services/blog.service";
import { cloudinaryUploadImg } from "../utils/cloudinary";
import fs from 'fs';

//create blog controller
export const createBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newBlog = await createBlog(req.body);
        if (!newBlog) return Fmsg(res, "New blog post creation is unsuccess", 400);
        return Smsg(res, "New blog post success", newBlog);
    } catch (e:any) {
        return Fmsg(res, e.message, 400);
    }
};

//update blog controller
export const updateBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res, id);
        const updateBlog = await findBlogAndUpdate(id, req.body);
        if (!updateBlog) return Fmsg(res, "Update Blog is unsuccessful", 402);
        
        return Smsg(res, "Update Blog is successful", updateBlog);
        

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};


//get one blog controller
export const getOneBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res, id);
        await incrementBlogView(id);
        const blog = await findBlogById(id);
        if (!blog) return Fmsg(res, "Blog with that id is not found", 404);


        return Smsg(res, "Blog post is here", blog);

    } catch (e: any) {
          return Fmsg(res, e.message, 400);
    }
};

 
//get all blogs controller
export const getAllBlogsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await getAllBlogs();
        if (!blog) return Fmsg(res, "Blogs not founds", 404);


        return Smsg(res, "Blogs are here!", blog);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};


//delete one blog
export const deleteOnBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res, id);
        const blog = await deleteOneBlog(id);
        if (!blog) return Fmsg(res, "Blog with that not founds", 404);

        return Smsg(res, "Blog delete is successful!", blog);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//like blog
export const likeBlogController = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const { blogId } = req.body;
          validateMongoDbId(res, blogId);
          
          let blog = await findBlogById(blogId);
          const loginUserId = res.locals.user._id;

          //find if the user has liked the post 
          const isLiked = blog?.isLiked;




          const alreadyDisLiked = blog?.dislikes.find(
              (userId => userId?.toString() === loginUserId?.toString())
          );

          if (alreadyDisLiked) {
              blog = await pullDislikeBlog(blog?._id, loginUserId);
          } 

          if (isLiked) {
              blog = await pullLikeBlog(blog?._id, loginUserId);
          } else {
              blog = await pushLikeBlog(blog?._id, loginUserId);
          }

        

           
          if (blog) {
             return Smsg(res, "Modified Like in Blog is successful", blog);
        }
         



      

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//dislike blog
export const disLikeBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { blogId } = req.body;
        validateMongoDbId(res, blogId);

        let blog = await findBlogById(blogId);
        const loginUserId = res.locals.user._id;

        const isDisLike = blog?.isDisLiked;
        
        const alreadyLike = blog?.likes.find(((userId) => userId.toString() === loginUserId.toString()));

        if (alreadyLike) {
            blog = await pullLikeBlog(blog?.id, loginUserId);
        }

        if (isDisLike) {
            blog = await pullDislikeBlog(blog?.id,loginUserId);
        } else {
            blog = await pushDislikeBlog(blog?.id, loginUserId);
        }

        if (blog) return Smsg(res, "Modified Blog is successful", blog);

        

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//upload images blog
export const uploadImagesBlogController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res, id);
        const uploader = (path: any) => cloudinaryUploadImg(path);
        const urls: any = [];
        const files:any = req.files;

        for (const file of files) {
            const {path} = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }


        const findBlog = await findBlogAndUpdate(id, {
            images: urls.map((url:string) => { return url })
        });
        if (!findBlog) return Fmsg(res, "Uploading blog images fail", 201);
        return Smsg(res,"Uploading blogs images succes",findBlog)

    
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};