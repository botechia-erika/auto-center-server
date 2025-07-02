import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectMongoDB } from '../config/mongoose.js';
import { MainRouter } from '../routes/main.js';
export class Server{

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.mainRouter = new MainRouter()
        this.setMiddlewares();
        this.setRoutes();

    }

    setMiddlewares() {
        connectMongoDB();
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve('public')));
        
        this.app.use(express.static(path.resolve('STORAGE')));
    }

    setRoutes() {
        this.app.use("/", this.mainRouter.getRouter())
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}