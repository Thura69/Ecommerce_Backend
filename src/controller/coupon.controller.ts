import { validateMongoDbId } from "../middlewares/validMongodbId";
import { couponModel } from "../models/coupon.Model";
import { createCoupon, deleteCoupon, getAllCoupon, updateCoupon } from "../services/coupon.service";
import { Fmsg, Smsg } from "../utils/Rmsg";
import { Request,Response,NextFunction} from 'express';

//create coupon
export const createCouponController = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const newCoupon = await createCoupon(req.body);
        if (!newCoupon) return Fmsg(res, "Coupon creation fail", 201);
        return Smsg(res, "Coupoun creation is sucess", newCoupon);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//get all coupon
export const getAllCouponController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCoupon = await getAllCoupon();
        if (!newCoupon) return Fmsg(res, "Coupon get is fail", 201);
        return Smsg(res, "All Coupon is here", newCoupon);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//update coupon
export const updateCouponController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res, id);

        const coupon = await updateCoupon(id, req.body);
        if (!coupon) return Fmsg(res, "Coupon update is fail", 201);
        return Smsg(res, "Coupon update is success", coupon);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
  }
};

//delete coupon
export const deleteCouponController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res, id);

        const coupon = await deleteCoupon(id);
        if (!coupon) return Fmsg(res, "Coupon delete is fail", 201);
        return Smsg(res, "Coupon delete is success", coupon);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};
