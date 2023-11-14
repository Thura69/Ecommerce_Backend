import mongoose from "mongoose";
import { couponDocument } from "../types/coupon.types";

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    expiry: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }

});


export const couponModel = mongoose.model<couponDocument>("coupon", couponSchema);

