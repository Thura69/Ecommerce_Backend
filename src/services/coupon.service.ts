import mongoose from "mongoose";
import { couponModel } from "../models/coupon.Model";


//create coupon
export const createCoupon = async (payLoad: object) => {
    try {
        const coupon = await couponModel.create(payLoad);
        return coupon;
    } catch (err:any) {
        throw new Error(err);
    }
};

//get all coupon
export const getAllCoupon = async () => {
    try {
        const coupon = await couponModel.find();
        return coupon;
    } catch (err: any) {
        throw new Error(err);
  }
};

//get one coupon
export const getOneCoupon = async (payload:object) => { 
    try {
        const coupon = await couponModel.findOne(payload);
        return coupon;
    } catch (err: any) {
        throw new Error(err);
    }
};


//update coupon
export const updateCoupon = async (id:string,payload:object) => {
    try {
        const coupon = await couponModel.findByIdAndUpdate(id, payload, {
            new: true
        });
        return coupon;
    } catch (err: any) {
        throw new Error(err);
  }
};

//delete coupon
export const deleteCoupon = async (id:string) => {
    try {
        const coupon = await couponModel.findByIdAndDelete(id);
        return coupon;
    } catch (err: any) {
        throw new Error(err);
  }
};