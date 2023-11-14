import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { Fmsg } from "../utils/Rmsg";

export const validator = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        next();
    } catch (error: any) {
        return res.status(400).send(error.errors)
    }
};