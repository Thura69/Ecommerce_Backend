import { string,object } from 'zod';


export const categorySchema = object({
    body: object({
        title: string({ required_error: "Title is required" })
    })
});

