import { object, string,number } from 'zod';

export const couponSchema = object({
    body: object({
        name: string({ required_error: "Name is required" }),
        expiry: string({ required_error: "Expiry is required" }),
        discount: number({ required_error: "Discount is required" })
    })
});


export const applyCouponSchema = object({
    body: object({
        coupon: string({ required_error: 'Coupon is required' })
    })
});