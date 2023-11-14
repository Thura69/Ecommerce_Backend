import mongoose, { Mongoose } from "mongoose";
import { orderDocument } from "../types/order.types";
import { string } from "zod";


const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products'
                }
            }
        ],
        paymentIntent: {
            id: { type: String },
            method: { type: String },
            amount: { type: Number },
            status: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Cash on Delivery",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Delivered"
            ]
            }, 
            created: Date,
            currency:String
        },
        orderStatus: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Cash on Delivery",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Delivered"
            ]
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }, {
        timestamps:true
    }
);

export const orderModle = mongoose.model<orderDocument>('Order', orderSchema);