import { Response } from "express";

export function Smsg(res: Response, msg = "", result: {}) {
    return res.status(200).json({con:true,msg,result})
};

export function Fmsg(res: Response, msg = "", status:number) {
    return res.status(status).json({con:false,msg,result:null})
};