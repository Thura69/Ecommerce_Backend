import mongoose from "mongoose";
import config from 'config';


export const connect =() => {
    try {
        mongoose.connect(config.get<string>('db1Link')).then(() => {
        console.log("Data Base is connected now!");
    });
    } catch (error) {
        console.log(error);
   }
};
