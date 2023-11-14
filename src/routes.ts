import {Express} from 'express';
import { HealthCheck } from './routes/healthCheck.routes';
import { Authentication } from './routes/auth.routes';
import { Product } from './routes/product.routes';
import { Blog } from './routes/blog.routes';
import { Category } from './routes/category.routes';
import { BlogCategory } from './routes/blogCategory.routes';
import { Coupon } from './routes/coupon.routes';


const routes = (app: Express) => {
    
    //healthCheck
    HealthCheck(app);

    //Authentication
    Authentication(app);

    //Products
    Product(app);

    //Blog
    Blog(app);

    //Category
    Category(app);

    //Blog Category 
    BlogCategory(app);

    //Coupon 
    Coupon(app);
};


export default routes;