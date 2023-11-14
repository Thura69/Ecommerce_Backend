import { Request,Response,NextFunction } from "express";
import { Fmsg } from "../utils/Rmsg";
import { verifyJwt } from "../utils/jwt";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token:string;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
        const { decoded, expired } = verifyJwt(token);
        if (expired) return Fmsg(res, "Token expires!", 401);
        res.locals.user = decoded;
        next();

    } else {
        return Fmsg(res,"There is no token",404)
    }
};