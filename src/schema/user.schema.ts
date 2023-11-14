import { object, string } from 'zod';


export const userSchema = object({
    body: object({
        firstname: string({ required_error: 'First name is required!' }),
        lastname: string({ required_error: 'Last name is required' }),
        email: string({ required_error: 'Email is required' }),
        password: string({ required_error: 'Password is required' }),
        mobile:string({required_error:'Mobile is required'})
        
    })
});

export const userLoginSchema = object({
    body: object({
        email: string({ required_error: 'Email is required' }),
        password: string({ required_error: "Password is required" })
    })
});

export const wishListSchema = object({
    body: object({
        productId: string({ required_error: 'ProductId is required' })
    })
});