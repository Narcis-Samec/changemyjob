
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel"
import { Types } from 'mongoose';

class Auth {
    public static maxDuration = 259200; //in seconds - 259200 = 3 days

    public static createToken(_id: Types.ObjectId): string | void {
        return jwt.sign({_id}, "super secret", {
            expiresIn: this.maxDuration
        })
    }

    public static requireAuth(req: { cookies: { jwt: string | void; }; }, res: { redirect: (arg0: string) => void; }, next: () => void) {
        const TOKEN = req.cookies.jwt;

        if(TOKEN) {
            jwt.verify(TOKEN, "super secret", (err: any, decodedToken: any) => {
                if(err) {
                    console.log(err.message)
                    res.redirect("/")
                } else {
                    next();
                }
            })
        } else {
            res.redirect("/")
        }
    }

    public static chcekUser(req: { cookies: { jwt: any; }; }, res: any, next: () => void) {
        const TOKEN = req.cookies.jwt;
        if(TOKEN) {
            jwt.verify(TOKEN, "super secret", async (err: any, decodedToken: any) => {
                if(err) {
                    console.log(err.message)
                    res.locals.user = null;
                    next();
                } else {
                    let user = await UserModel.findById(decodedToken._id)
                    res.locals.user = user;
                    next();
                }
            })
        } else {
            res.locals.user = null;
            next();
        }

    }
}

export default Auth;