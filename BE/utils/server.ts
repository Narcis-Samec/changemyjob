import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import Auth from "../middleware/Auth";
import { Request, Response } from 'express';

export default function createServer() {
    const app = express();

    //middleware
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cookieParser())
    app.get("*", Auth.chcekUser)
    app.patch("*", Auth.chcekUser)

    //route bundeling
    app.use(require('../routes/public/userRoutes'))
    app.use(require('../routes/protected/userSpecificsRoute'))

    //creating home route
    app.get('/', (req: Request, res: Response) => {
        res.json('Application is running');
      });

    //DB
    /* istanbul ignore next */ 
    if (process.env.NODE_ENV !== 'test') {
        mongoose.connect("mongodb+srv://user123:Password123*@cluster0.2cqegnk.mongodb.net/Mern?retryWrites=true&w=majority")
    }

    return app
}
