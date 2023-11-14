
//not found
import { Request,Response,NextFunction } from "express"

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//error handler

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statuscode = res.statusCode == 200 ?  res.statusCode : 500;
    res.status(statuscode);
    res.json({
        message: err?.message,
        statck: err?.stack
    })


};

