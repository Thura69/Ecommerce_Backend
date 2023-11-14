import { object } from 'zod';
import mongoose, { Types } from 'mongoose';
import { ProductInput } from './../types/product.types';
import { Request,Response,NextFunction } from "express"; 
import { Fmsg, Smsg } from "../utils/Rmsg";
import { addRating, createProduct, deleteProduct, getAllProducts, getaProduct, updateProducts, updateRating } from "../services/product.service";
import slugify from 'slugify';
import { match } from 'assert';
import { productModel } from '../models/productModel';
import { Product } from '../routes/product.routes';
import { addWishList, findUser, removeWishList } from '../services/user.service';
import { validateMongoDbId } from '../middlewares/validMongodbId';
import { cloudinaryUploadImg } from '../utils/cloudinary';
import { Multer } from 'multer';
import fs from 'fs';


//create product
export const createProductController = async (req: Request<{},{},ProductInput>, res: Response, next: NextFunction) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const prouduct = await createProduct(req.body);
        Smsg(res, "Create product is success", prouduct);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }; 
};

//get products
export const getaProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await getaProduct(id);
        if (!product) return Fmsg(res, "Product with that id is not found!", 404);
        return Smsg(res, "Product", product);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    };
};

//get all products
export const getAllProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
       //Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);


        let query = await productModel.find(JSON.parse(queryStr));


      //Sorting
        if (req.query.sort) {
            const sortBy = (req.query.sort as string).split(",").join(" ");
             query = await productModel.find().sort(sortBy);
        } else {
            query = await productModel.find().sort('-createdAt');
        }

        //Limiting the fields
        if (req.query.fields) {
            const fields = (req.query.fields as string).split(",").join("  ");
            query = await productModel.find().select(fields);
        } else {
            query = await productModel.find().select('-__v');
        }

        //Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (Number(page) - 1) * Number(limit);

        query = await productModel.find().skip(skip).limit(Number(limit));
        if (req.query.page) {
            const productCount = await productModel.find().countDocuments();
            if (skip >= productCount) {
                return Fmsg(res, "This Page does not exists", 404);
            }
        };


        return Smsg(res, "Products", query);

        // const products = await getAllProducts();
        // if (!products) return Fmsg(res, "No products found!", 404);
        // return Smsg(res, "All products", products);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//update product
export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        console.log(req.body)
        const products = await updateProducts(id, req.body);
        if (!products) return Fmsg(res, "Update product failed!", 404);
        return Smsg(res, "Update product success!", products);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//delete product
export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await deleteProduct(id);
        if (!product) return Fmsg(res, "Delete product fail!", 400);
        return Smsg(res, "Delete product succes!", product);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//add wishList
export const WishListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.user;
        const { productId } = req.body;
        let user = await findUser({ _id: _id });
        const product = await getaProduct(productId);
        if (!user) return Fmsg(res, "User not found!", 404);
        if (!product) return Fmsg(res, "Product not found", 404);

        const alreadyWish = user.wishlist.find((p: string) => p.toString() == product._id.toString());

        if (alreadyWish) {
            user = await removeWishList(user.id, product.id);
        } else {
            user = await addWishList(user.id, product.id);
        }

        await user?.save();

        if (!user) return Fmsg(res, "Wishlist is unsuccessfully", 201);

        return Smsg(res, "Wishlist is successfully add!", user);
        

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

export const GetWishListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.user;
        

           
           const user = await findUser({_id:_id});
           if (!user) return Fmsg(res, "User not found", 404);

           return Smsg(res, "Wishlists", user);
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
}

//add rating
export const RatingController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = res.locals.user;
        const { star, productId, comment } = req.body;


        validateMongoDbId(res, _id);

        let user = await findUser({ _id: _id });
        let product = await getaProduct(productId);
        if (!user) return Fmsg(res, "User not found with that id", 404);
        if (!product) return Fmsg(res, "Product not found with that id", 404);

        const alreadyRating = product.ratings.find((userId) => userId.postedBy.toString() === user?._id.toString());

        if (alreadyRating) {
            const newRating = await updateRating(alreadyRating, star,comment);
            if (!newRating) return Fmsg(res, "Update rating fail!", 201);
        } else {
            const rating = await addRating(user.id, product.id, star,comment);
            if (!rating) return Fmsg(res, "Rating fail!", 201);
        }

        product = await getaProduct(productId);
        if (!product) return Fmsg(res, "Product not found", 404);
        return Smsg(res, "Rating success!", product);
        
    } catch (e: any) {
        return Fmsg(res, e.message, 400);
    }
};

//upload images controller
export const uploadImagesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        validateMongoDbId(res,id);
        const upload = (path:any) => cloudinaryUploadImg(path);
        const urls:any = [];
        const files:any = req.files;

        for (const file of files) {
            const { path } = file;
            const newpath = await upload(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        };


        const findProduct = await updateProducts(id, {
            images: urls.map((file: string) => { return file })
        });

        if (!findProduct) return Fmsg(res, "Upload images fail", 201);
        return Smsg(res, "Images", findProduct);

    } catch (e: any) {
        return Fmsg(res, e.message, 400);
  } 
};