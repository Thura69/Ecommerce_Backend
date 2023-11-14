import { authMiddleware } from './../middlewares/authMiddleware';
import { Express } from "express"
import { validator } from "../middlewares/validator"
import { productSchema, ratingSchema } from "../schema/product.schema"
import { RatingController, createProductController, deleteProductController, getAllProductsController, getaProductController, updateProductController, uploadImagesController } from "../controller/product.controller"
import { getaProduct } from "../services/product.service"
import { isAdmin } from "../middlewares/isAdmin"
import { productImgResize, uploadPhoto } from '../middlewares/uploadImages';


export const Product = (app: Express) => {
    
    //create procut
    app.post('/api/products/create', authMiddleware, isAdmin, validator(productSchema), createProductController);

    //upload Images
    app.put('api/products/images-upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImagesController);
    
    //get a product
    app.get('/api/products/:id', getaProductController);
    
    //get all product
    app.get('/api/products',getAllProductsController);
    
    //update product
    app.put('/api/products/:id',authMiddleware,isAdmin,updateProductController);

    //delete product
    app.delete('/api/products/:id', authMiddleware, isAdmin, deleteProductController);
    
    //rating
    app.post('/api/products/rating', authMiddleware,validator(ratingSchema), RatingController);


};