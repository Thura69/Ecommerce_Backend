import { object,string,number } from "zod";


export const productSchema = object({
    body: object({
        title: string({ required_error: "Product title is required" }),
        description: string({ required_error: "Description is required" }),
        price: number({ required_error: "Price is required" }),   
    })
});

export const ratingSchema = object({
    body: object({
        star: number({ required_error: "Star is required" }),
        productId: string({ required_error: "ProductId is required" }),
        comment:string({required_error:"comment is required"})
    })
});