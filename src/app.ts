import express from 'express';
import config from 'config';
import routes from './routes';
import { connect } from './utils/connect';
import bodyParser from 'body-parser';
import { errorHandler, notFound } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import slugify from 'slugify';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));



app.listen(config.get<string>('port'), () => {
    routes(app);
    connect();
    console.log(`server is running at http://127.0.0.1:${config.get<string>('port')}`);
});






