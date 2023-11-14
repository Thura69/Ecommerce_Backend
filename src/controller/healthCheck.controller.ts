import { NextFunction, Response, Request } from "express";

const HealthCheckController = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send('Healthy');  
};

export default HealthCheckController