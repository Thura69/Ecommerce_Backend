import jwt from 'jsonwebtoken';
import config from 'config';
import { JwtDecodeOptions } from 'jwt-decode';

const privateKey = config.get<string>("JwtSecret");

//create token
export const signJwt = (obj: object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(obj, privateKey, options);
};

//check token
export const verifyJwt = (payload: string) => {
    try {
        const decoded = jwt.verify(payload, privateKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    } catch (e: any) {
        return {
            valid: false,
            expired: true,
            decoded: null
        }
    }
};

//refresh token
export const refreshJwt = (obj: object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(obj, privateKey, options);
};
