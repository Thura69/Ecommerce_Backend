import { Request, Response, NextFunction } from "express";
import { UserInput, UserLogin } from "../types/user.types";
import { blockOneUsers, createUser, deleteOneUsers, findOneandUpdate, findUser, getOneUsers, getUsers, updateOneUsers } from "../services/user.service";
import { Fmsg, Smsg } from "../utils/Rmsg";
import {  refreshJwt, signJwt, verifyJwt } from "../utils/jwt";
import config from "config";
import { validateMongoDbId } from "../middlewares/validMongodbId";
import { sendMailController } from "./emailler.controller";
import {createHash} from 'crypto'
import { filterOneProductInCart, findOneAndUpdateInCart, findOrderUserAndDelete, findOrderUserInCart } from "../services/cart.service";
import { productModel } from "../models/productModel";
import { CartModel } from "../models/cart.Model";
import { getOneCoupon } from "../services/coupon.service";
import uniqid from 'uniqid';
import { createOrder } from "../services/order.service";
import { orderModle } from "../models/orderModel";

//register
export const registerUserController = async (req: Request<{}, {}, UserInput>, res: Response, next: NextFunction) => {
    try { 
    const email = req.body.email;
    const user = await findUser({ email: email });
    if (user) return Fmsg(res, "User already existed", 409);

    const newUser = await createUser(req.body);
    if (newUser) return Smsg(res, "User added success!", newUser);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//login
export const loginUserController = async (req: Request<{}, {}, UserLogin>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await findUser({ email: email });
        if (!user) return Fmsg(res, "User with that email is not found!", 404);
        const isLegit = await user.comparePassword(password);
        console.log(isLegit);
        if (!isLegit) return Fmsg(res, "Invalid Credentials!", 403);

      
        const sessionObject = {
            _id: user?._id,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email
        };

        const refreshToken = refreshJwt(sessionObject,{expiresIn:config.get<string>('refreshTokenTtl')});
        const updateUser = await updateOneUsers(user._id, { refreshToken: refreshToken });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        const accessToken = signJwt(sessionObject, {
            expiresIn: config.get<string>('signTokenTtl')
        });


        return Smsg(res, 'Login SuccessFul', accessToken);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//admin login
export const loginAdminController = async (req: Request<{}, {}, UserLogin>, res: Response, next: NextFunction) => {
     try {
        const { email, password } = req.body;
        const user = await findUser({ email: email });
        if (!user) return Fmsg(res, "User with that email is not found!", 404);
         if (user.role !== 'admin') return Fmsg(res, "You are not admin!", 403);
        const isLegit = await user.comparePassword(password);
        if (!isLegit) return Fmsg(res, "Invalid Credentials!", 403);

      
        const sessionObject = {
            _id: user?._id,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email
        };

        const refreshToken = refreshJwt(sessionObject,{expiresIn:config.get<string>('refreshTokenTtl')});
        const updateUser = await updateOneUsers(user._id, { refreshToken: refreshToken });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        const accessToken = signJwt(sessionObject, {
            expiresIn: config.get<string>('signTokenTtl')
        });


        return Smsg(res, 'Login SuccessFul', accessToken);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
}

//get all users
export const getAllUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        if (!users) return Fmsg(res, 'Users not found!', 404);
        
        return Smsg(res, "All users!", users);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//get all users
export const getOneUserController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await getOneUsers(id);
        if (!user) return Fmsg(res, 'User not found!', 404);
        
        return Smsg(res, "One user!", user);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//delete one user
export const deleteOneUserController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await deleteOneUsers(id);
        if (!user) return Fmsg(res, 'User not found!', 404);
        
        return Smsg(res, "One user delete successful!", user);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//update one user
export const updateOneUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.user.sessionObject;
        const updateObj = {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        };

        const user = await updateOneUsers(_id, updateObj);
        if (!user) return Fmsg(res, 'User not found!', 404);
        
        return Smsg(res, "One user edit successful!", user);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//block one user
export const blockUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const block = await blockOneUsers(id, { isBlocked: true });
        if (!block) return Fmsg(res, "Block is unsuccess!", 400);
        Smsg(res, "Block is successful", block);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//unblock one user
export const unBlockUserController = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const { id } = req.params;
        const block = await blockOneUsers(id, { isBlocked: true });
        if (!block) return Fmsg(res, "Unblock is unsuccess!", 400);
        Smsg(res, "unBlock is successful", block);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//refresh token
export const handleRefreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
     try {
         const cookie = req.cookies;
         if (!cookie.refreshToken) return Fmsg(res, "No refresh token", 404);
         const refreshToken = cookie.refreshToken;
         const user = await findUser({ refreshToken });
         if (!user) return Fmsg(res, "User with that token not found!", 404);
         const { expired, decoded } = verifyJwt(refreshToken);
         if (expired) return Fmsg(res, "There is something wrong with refresh token", 400);

        const sessionObject = {
            _id: user?._id,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email
        };

         const accessToken = signJwt(sessionObject);

         Smsg(res, "Access Token", accessToken);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//logout 
export const handleLogoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.cookies;
        if (!cookie.refreshToken) return Fmsg(res, "No refresh token", 404);
        const refreshToken = cookie.refreshToken;
        const user = await findUser({ refreshToken });
        if (!user) {
            res.clearCookie('refreshToken', { httpOnly: true, secure: true });
            return Fmsg(res, "Forbidden", 204);
        };


        await findOneandUpdate({ refreshToken: refreshToken }, { refreshToken: "" });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        });

        Smsg(res, "Logout success", 200);

          
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//update Password
export const updatePasswordController = async (req: Request, res: Response, next: NextFunction) => {
     try {
         const { _id } = res.locals.user;
         const { password } = req.body;
         
         validateMongoDbId(res, _id);

         const user = await getOneUsers(_id);
         if (!user) return Fmsg(res, "User not Found!", 404);
         if (password) {
             user!.password = password;
             const updatePassword = await user?.save();
             if (!updatePassword) return Fmsg(res, "Update password fail", 400);
             const freshUser = await getOneUsers(updatePassword._id);
             return Smsg(res, "Update password success!", freshUser!);
         } else {
             return Smsg(res, "Update Password need password", user);
         }

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//forgot Password
export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
     try {
     
         const { email } = req.body;
         const user = await findUser({ email: email });
         if (!user) return Fmsg(res, "User with that email is not found!", 404);

         const token = await user.createPasswordResetToken();
         await user.save();

         const resetUrl = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href='http://127.0.0.1:3003/api/users/reset-password/${token}'>Click Here</a>`

         const data = {
             to: 'spyking64@gmail.com', 
             text: "Hey User",
             subject: "Forgot Password Link",
             html: resetUrl
         };

         sendMailController(data);

         return Smsg(res, "Forgot your password", token);

         

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//reset Password
export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { password } = req.body;
        const { token } = req.params;

        const hashedToken = createHash('sha256').update(token).digest('hex');
        const user = await findUser({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });


        if (!user) return Fmsg(res, "Token Expired, Please try again later", 401);

        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        return Smsg(res, "Reset password success", user);

    } catch (e: any) {
      return Fmsg(res,e.message,400)
  }  
};

//save address
export const saveAddressController = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { _id } = res.locals.user;
        validateMongoDbId(res, _id);


        const update = await findOneandUpdate(_id, {
            address: req.body?.address
        });
        if (!update) return Fmsg(res, "Add address is fail", 201);
        return Smsg(res, "Add address is success", update);
    } catch (e: any) {
      return Fmsg(res,e.message,400)
  }  
}; 


//user cart
export const userCartController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart } = req.body;
        const { _id } = res.locals.user;
       
        validateMongoDbId(res, _id);

        
        let products:any = [];
        const user = await findUser({ _id: _id });
        if (!user) return Fmsg(res, "User not found with that id", 404);
        const alreadyExistCart:any | null = await findOrderUserInCart({ orderBy: user?._id });
        if (alreadyExistCart) return alreadyExistCart.remove();  


        type ProductObject = {
    product: string | null;
    count: number | null;
    color: string | null;
    price: any | null;
};

        const object: ProductObject = {
            product: null,
            count: null ,
            color: null,
            price:null
        };
        for (let i = 0; i<cart.length;  i++) {
            object.product = cart[i].id,
            object.count = cart[i].count,
            object.color = cart[i].color
            // object.price = await productModel.findById(cart[i].id);
            let price = await productModel.findById(cart[i].id).select('price').exec();
            object.price = price?.price;

            products.push(object);
        };

        let cartTotal = 0;
        for (let i = 0;i< products.length; i++){
            cartTotal = cartTotal + products[i].price * products[i].count;
        }


        let newCart = await new CartModel({
            products,
            cartTotal,
            orderBy: user?._id
        }).save();

        if (!newCart) return Fmsg(res, "Fail", 201);
        return Smsg(res, 'success', newCart);
        
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//get uer cart
export const getUserCartController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.user;
      
        validateMongoDbId(res, _id);

        const cart = await findOrderUserInCart({ orderBy: _id });
        if (!cart) return Fmsg(res, "Cart not found", 404);
        return Smsg(res, "Cart is here!", cart);

  }catch (e: any) {
        return Fmsg(res, e.message, 400);
    }  
};

//remove cart
export const removeUserCartController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.user;
        validateMongoDbId(res, _id);
        const user = await getOneUsers(_id);
        if (!user) return Fmsg(res, "User not found!", 404);
        const emptyCart = await findOrderUserAndDelete({ orderBy: _id });
        if (!emptyCart) return Fmsg(res, "Cart empty is fail!", 201);
        return Smsg(res, 'Cart is empty now!', emptyCart);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//apply coupon
export const applyUserCouponController = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const { _id } = res.locals.user;
        validateMongoDbId(res, _id);
        const { coupon } = req.body;
        const user = await getOneUsers(_id);
        if (!user) return Fmsg(res, "User not found!", 404);
        const cart = await filterOneProductInCart({ orderBy: _id });
        if (!cart) return Fmsg(res, "Cart is not found", 404);
        const aboutCoupon = await getOneCoupon({name:coupon});
        if(!aboutCoupon)return Fmsg(res,"Coupon is not found",404);
        const discount = aboutCoupon.discount;
        const cartTotal = cart.cartTotal;
        
        const totalAfterDiscount = (cartTotal - (cartTotal * discount) / 100).toFixed(2);

        const discountDone = await findOneAndUpdateInCart({ orderBy: _id }, { totalAfterDiscount: totalAfterDiscount });
        if (!discountDone) return Fmsg(res, "Discount is fail", 201);
        return Smsg(res, "Discount is success!", discountDone); 
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

export const createOrderController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.user;
        const { COD, couponApplied } = req.body;
        
        
        if (!COD) throw new Error("Create cash order failed");
        const user = await getOneUsers(_id);
        let userCart = await filterOneProductInCart({ orderBy: user?._id });
        if (!userCart) return Fmsg(res, "Cart is not found!", 404);
        let finalAmount = 0;
        if (couponApplied && userCart?.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount 
        } else {
            finalAmount = userCart?.cartTotal 
        }
         
        console.log(userCart)
         
        let orderObject = {
            products: [userCart.products],
            paymentIntent: {
                id: uniqid(),
                method: 'COD',
                amount: finalAmount,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: 'usd'
            },
            orderBy: user?._id,
            orderStatus: "Cash on Delivery"
        };

        const newOrder = await createOrder(orderObject);
        
        if (!newOrder) return Fmsg(res, "Order Fail!", 201);

        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } }
                }
            }
        });

        const updated = await productModel.bulkWrite(update, {});
        
        if (!updated) return Fmsg(res, "Fail!", 201);
         
        return Smsg(res, "Success", updated);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

export const getOrdersController = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const orders = await orderModle.find().populate('products.product');
        if (!orders) return Fmsg(res, "Orders fail!", 201);
        return Smsg(res, "Order success", orders);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

export const updateOrderController = async (req: Request, res: Response, next: NextFunction) => {
      try { 
          const { status } = req.body;
          const { id } = req.params;
          validateMongoDbId(res,id);
          const order = await orderModle.findByIdAndUpdate(id, {
              orderStatus: status,
              paymentIntent: {
                  status: status
              }
          }, {
              new: true
          });
          if (!order) return Fmsg(res, "Fail", 201);
          return Smsg(res, "Order update success!", order);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
}