import {Response,Request, NextFunction } from 'express';
import { findUser } from '../services/user.service';
import { Fmsg } from '../utils/Rmsg';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = res.locals.user;
    const adminUser = await findUser({ email: email });
    if (adminUser?.role !== 'admin') return Fmsg(res, "You are not an admin", 403);
    next();
};