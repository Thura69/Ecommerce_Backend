import { object, number, string } from 'zod';

export const blogSchema = object({
    body: object({
        title: string({ required_error: "Title is required" }),
        description: string({ required_error: "Description is required" }),
        category: string({ required_error: "Category is required" })
    })
});

export const blogLikeSchema = object({
    body: object({
        blogId: string({ required_error: "This blog id is required" })
    })
});