import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import Auth from "../middleware/Auth";
import { Request, Response } from 'express';

/**
 * Creates instance of {@link Express } server and bundeles, middleware, routes & will connect to DB
 * @return { app } app
 * @author Alan Kovac
 */
export default function createServer() {
    const app = express();

    /**
     * MIDDLEWARE
     * setting parsers & auth
     */
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cookieParser())
    app.post("*", Auth.chcekUser)
    app.get("*", Auth.chcekUser)
    app.patch("*", Auth.chcekUser)
    app.delete("*", Auth.chcekUser)

    /**
     * ROUTES
     * TBD: we will need some sort of auto injection sice we can have many routes
     */
    app.use(require('../routes/public/userRoutes'))
    app.use(require('../routes/protected/userSpecificsRoute'))
    app.use(require('../routes/protected/dataPumpsRoutes'))
    app.use(require('../routes/protected/regionRoutes'))
    app.use(require('../routes/protected/countryRoutes'))

    /**
     * TBD: home route will be separeted
     */
    app.get('/', (req: Request, res: Response) => {
        res.json('Application is running');
    });


    /**
     * DB
     * TBD: we will need to handle the connection better than this...
     */
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
        mongoose.connect("mongodb+srv://user123:Password123*@cluster0.2cqegnk.mongodb.net/Mern?retryWrites=true&w=majority")
    }

    return app
}
