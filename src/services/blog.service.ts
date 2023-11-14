import { BlogModel } from "../models/blogModel";


//create Blog 
export const createBlog = async (obj: Object) => {
    try {
        const blog = await BlogModel.create(obj);
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};

//Update Blog Post
export const findBlogAndUpdate = async (id:string,payload: Object) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(id, payload, {
            new:true
        });
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};

//get one blog
export const findBlogById = async (id: string) => {
    try {
        const blog = await BlogModel.findById(id);
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};


//increment View controller
export const incrementBlogView = async (id: string) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(id, {
            $inc: { numViews: 1 }
        }, {
            new:true
        });
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};

// get all blogs
export const getAllBlogs = async () => {
      try {
        const blog = await BlogModel.find().populate('likes dislikes');
        return blog;
    } catch (err: any) {
        throw new Error(err);
    } 
};

// delete one blogs
export const deleteOneBlog = async (id: string) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(id);
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};

//pull dislike blog
export const pullDislikeBlog = async (blogId: string, userId: string) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(blogId, {
            $pull: { dislikes: userId },
            isDisLiked: false
        }, {
            new: true
        });
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};

//push dislike blog
export const pushDislikeBlog = async (blogId: string, userId: string) => {
    try { 
        const blog = await BlogModel.findByIdAndUpdate(blogId, {
            $push: { dislikes: userId },
            isDisLiked: true
        }, {
            new: true
        });

        return blog;

    } catch (err: any) {
        throw new Error(err);
    }
}

//pull like blog
export const pullLikeBlog = async (blogId: string, userId: string) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(blogId, {
            $pull: { likes: userId },
            isLiked: false
        }, {
            new: true
        });
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};

//add like blog
export const pushLikeBlog = async (blogId: string, userId: string) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(blogId, {
            $push: { likes: userId },
            isLiked: true
        }, {
            new: true
        });
        return blog;
    } catch (err: any) {
        throw new Error(err);
    }
};