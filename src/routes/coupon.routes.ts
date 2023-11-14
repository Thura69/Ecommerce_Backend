import { Express } from "express"
import { authMiddleware } from "../middlewares/authMiddleware";
import { validator } from "../middlewares/validator";
import { couponSchema } from "../schema/coupon.schema";
import { createCouponController, deleteCouponController, getAllCouponController, updateCouponController } from "../controller/coupon.controller";
import { isAdmin } from "../middlewares/isAdmin";
import { getAllBlogsController } from "../controller/blog.controller";
import { getAllCoupon } from "../services/coupon.service";

export const Coupon = (app: Express) => {
    //create coupon 
    app.post('/api/coupon', authMiddleware, isAdmin, validator(couponSchema), createCouponController);
    
    //get all coupon
    app.get('/api/coupon', authMiddleware, isAdmin, getAllCouponController);
    
    //update coupon
    app.put('/api/coupon/:id', authMiddleware, isAdmin, updateCouponController); 

    //delete coupon
    app.delete('/api/coupon/:id', authMiddleware, isAdmin, deleteCouponController);
};