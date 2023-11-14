import { CartModel } from './../models/cart.Model'; 
import { Model } from 'mongoose';
import { cartDocument } from '../types/cart.types';

//create cart
export const createCart = async(payload:object) => {
    try {
        const cart = await CartModel.create(payload);
        return cart;
     } catch (e: any) {
        throw new Error(e);
    }
};

//find order user in cart
export const findOrderUserInCart = async (payload:object) => {
    try {
        const cart = await CartModel.findOne(payload).populate('products.product');
        return cart;
    } catch (e: any) {
        throw new Error(e);
    }
};

//find by id and remove
export const findOrderUserAndDelete = async (payload: object) => {
    try {
        const cart = await CartModel.findOneAndDelete(payload);
        return cart;
     }  catch (e: any) {
        throw new Error(e);
    }
};

//find by id and discount
export const findByIdAndDiscount = async (id: string, payload: object) => {
    try {
       
    } catch (e: any) {
        throw new Error
    }
}
//filter one 
export const filterOneProductInCart = async (payload: object) => {
    try { 
        const cart = await CartModel.findOne(payload);
        return cart;
    } catch (e: any) {
        throw new Error(e);
    }
};

//findOneAndUpdate
export const findOneAndUpdateInCart = async (filter: object, payload: object) => {
     try { 
         const cart = await CartModel.findOne(filter, payload, {
            new:true
        });
        return cart;
    } catch (e: any) {
        throw new Error(e);
    }
};