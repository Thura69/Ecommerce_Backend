import { orderModle } from "../models/orderModel";


//create order
export const createOrder = async (payload: object) => {
 try {
     const order = await orderModle.create(payload);
     return order;
} catch (err: any) {
        throw new Error(err)
    }
};