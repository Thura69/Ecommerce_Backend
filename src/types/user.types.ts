import mongoose from "mongoose";

export interface UserInput {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    mobile: string,
    role: string,
    isBlocked:false,
    cart: [],
    address: string,
    wishlist: [],
    refreshToken: string,
    passwordChangedAt: Date,
    passwordResetToken: string | undefined,
    passwordResetExpires:Date | undefined,
    comparePassword: (password: string) => {},
    createPasswordResetToken:()=>{}
};

export interface UserLogin{
    email: string,
    password:string
}

export interface UserDocument extends UserInput, mongoose.Document{
    createdAt: Date,
    updatedAt:Date
};
