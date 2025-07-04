import { Router } from 'express';
import { MainController } from '../controllers/mainController.js';


export class MainRouter {
    constructor() {
        this.router = Router();
        this.mainController = new MainController();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get("/", this.mainController.getIndex.bind(this.mainController));
    }

    getRouter() {
        return this.router;
    }
}