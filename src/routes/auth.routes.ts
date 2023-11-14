import { Response, Request, NextFunction } from "express"
import {Express} from 'express';
import { applyUserCouponController, blockUserController, createOrderController, deleteOneUserController, forgotPasswordController, getAllUserController, getOneUserController, getOrdersController, getUserCartController, handleLogoutController, handleRefreshTokenController, loginAdminController, loginUserController, registerUserController, removeUserCartController, resetPasswordController, saveAddressController, unBlockUserController, updateOneUserController, updateOrderController, updatePasswordController, userCartController } from "../controller/auth.controller";
import { validator } from "../middlewares/validator";
import { userLoginSchema, userSchema, wishListSchema } from "../schema/user.schema";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/isAdmin";
import { GetWishListController, WishListController } from "../controller/product.controller";
import { applyCouponSchema } from "../schema/coupon.schema";

export const Authentication = (app: Express) => {
    //register
    app.post('/api/users/register', validator(userSchema), registerUserController);

    //login
    app.post('/api/users/login', validator(userLoginSchema), loginUserController);

    //admin login
    app.post('/api/users/admin-login', validator(userLoginSchema), loginAdminController);

    //update Password
    app.put('/api/users/password', authMiddleware, updatePasswordController);
    
    //forgot password
    app.post('/api/users/forgot-password-token', forgotPasswordController);
    
    //reset password
    app.put('/api/users/reset-password/:token', resetPasswordController);

    //get all users
    app.get('/api/users/allusers', getAllUserController);

    //get one user
    app.get('/api/users/:id',authMiddleware,getOneUserController);

    //delete one user
    app.delete('/api/users/:id', deleteOneUserController);

    //update one user
    app.patch('/api/users/edit-user/:id',authMiddleware,updateOneUserController);

    //block user
    app.put('/api/users/block-user/:id', authMiddleware, isAdmin,blockUserController); 

    //unblock user
    app.put('/api/users/unblock-user/:id', authMiddleware, isAdmin, unBlockUserController);
    
    //refresh token
    app.get('/api/users/auth/refresh', handleRefreshTokenController);

    //logout 
    app.get('/api/users/auth/logout-user', handleLogoutController); 

    //add wishList
    app.post('/api/users/add-wishlist', authMiddleware, validator(wishListSchema), WishListController);
    
    //get all wishList
    app.get('/api/users/wishlist-get', authMiddleware, GetWishListController);
    
    //save address
    app.post('/api/users/add-address', authMiddleware, saveAddressController);

    //cart 
    app.post('/api/users/cart', authMiddleware, userCartController);
    
    //get cart
    app.get('/api/users/cart/get-one', authMiddleware, getUserCartController);

    //remove cart
    app.delete('/api/users/cart/clear-cart', authMiddleware, removeUserCartController);

    //apply coupon
    app.post('/api/users/applycoupon', authMiddleware, validator(applyCouponSchema), applyUserCouponController);
    
    //create order
    app.post('/api/users/cart-order', authMiddleware, createOrderController);

    //get all orders
    app.get('/api/users/orders/all', authMiddleware, getOrdersController);

    //update order
    app.put('/api/users/order/update/:id',authMiddleware,updateOrderController)

};