import { object } from 'zod';

import { userModel } from "../models/user.model";
import { UserInput } from "../types/user.types";

//find user
export const findUser = async (obj:object) => {
    try {
        const user = await userModel.findOne(obj).populate('wishlist');
        return user;
    } catch (err:any) {
        throw new Error(err);
    }
};

//create user
export const createUser = async (userInfo: UserInput) => {
    try {
        const user = await userModel.create(userInfo);
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
};

//get all users
export const getUsers = async () => {
    try {
        const user = await userModel.find();
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
};

//get user by Id
export const getOneUsers = async (id:string) => {
    try {
        const user = await userModel.findById(id).select('-password -__v');;
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
};

//delete user
export const deleteOneUsers = async (id:string) => {
    try {
        const user = await userModel.findByIdAndRemove(id).select('-password -__v');
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
};

//update user
export const updateOneUsers = async (payload:string,obj:object) => {
    try {
        const user = await userModel.findByIdAndUpdate(payload,obj,{new:true}).select('-password -__v'); 
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
};

//block user
export const blockOneUsers = async (id:string,obj:object) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, obj, { new: true });
        return user;
    } catch (err: any) {
        throw new Error(err);
   }
};

//unblock user
export const unblockOneUsers = async (id:string,obj:object) => {
    try {
        const user = await userModel.findByIdAndUpdate(id, obj, { new: true });
        return user;
    } catch (err: any) {
        throw new Error(err);
   }
};


//findOne and update
export const findOneandUpdate = async (payload: any, obj: object) => {
    try {
        const user = await userModel.findByIdAndUpdate(payload, obj, { new: true }).select('-password -__v');
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
};


//pull wishlist
export const addWishList = async (userId:string,productId:string) => {
    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $push: { wishlist: productId }
        }, {
            new: true
        });

        return user;
   } catch (err: any) {
        throw new Error(err);
    }
};

//push wishlist
export const removeWishList = async (userId: string, productId: string) => {
    try {
        const user = await userModel.findByIdAndUpdate(userId, {
            $pull: { wishlist: productId }
        }, {
            new: true
        });
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
}

