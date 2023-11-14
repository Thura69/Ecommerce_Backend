import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { NextFunction, Request,Response } from 'express';
import fs from 'fs';


const multerStorage = multer.diskStorage({
    destination: function (req:Request, file:Express.Multer.File, cb) {
    cb(null, path.join(__dirname, "../public/images"));

    },
    filename: function (req:Request, file:Express.Multer.File, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    }
});

const multerFilter = (req:Request, file:Express.Multer.File, cb)=>{
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb({
            message:"Unsupported file format"
        })
    }
};

export const productImgResize = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files[0]) return next();



    await Promise.all(
        req.files.map(async (file: Express.Multer.File) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`./src/public/images/products/${file.filename}`)
                fs.unlinkSync(`./src/public/images/products/${file.filename}`)
        })
    );
    next();
};

export const blogImgResize = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !req.files[0]) return next();
    await Promise.all(
        req.files.map(async (file: Express.Multer.File) => {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`./src/public/images/blogs/${file.filename}`)
                fs.unlinkSync(`./src/public/images/blogs/${file.filename}`)
        })
    );
    next();
};



export const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 200000 }
});