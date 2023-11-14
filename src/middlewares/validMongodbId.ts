import mongoose from "mongoose";
import { Fmsg } from "../utils/Rmsg";
import { Response } from "express";

export const validateMongoDbId = (res: Response, id: string) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return Fmsg(res, "This is is not valid or not found!", 400);
};
    
