
import jwt from "jsonwebtoken"
import UserModel, { Role } from "../models/UserModel"
import { Types } from 'mongoose';

export default class Auth {
    public static maxDuration = 259200; //in seconds - 259200 = 3 days

    public static createToken(_id: Types.ObjectId): string | void {
        return jwt.sign({ _id }, "super secret", {
            expiresIn: this.maxDuration
        })
    }

    public static requireAuthetication(req, res: any, next: () => void) {
        const token = req.cookies.jwt;
        
        if (!token) {
            // UnAuthenticated - nobody is logged in - lands here
            return res.sendStatus(401);
        }

        try {
            jwt.verify(token, "super secret");
            //SUCCES - user is logged in!
            return next();
        } catch {
            //UnAuthorized - wrong role - lands here
            return res.sendStatus(403);
        }
        
    }

    public static chcekUser(req: { cookies: { jwt: any; }; }, res: any, next: () => void) {
        const TOKEN = req.cookies.jwt;
        if (TOKEN) {
            jwt.verify(TOKEN, "super secret", async (err: any, decodedToken: any) => {
                if (err) {
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

    public static requireAuthorization(authLevel: Role) {
        const ROLES: Role[] = ["creator", "administrator", "leadAnalyst", "analyst", "user"]
        const LEVELS = ROLES.reduce((result: object, key: Role) => ({ ...result, [key]: ROLES.slice(ROLES.indexOf(key)) }), {})

        return (req: { path: any; }, res: { locals: { user: { role: string | number; _id: any; }; }; sendStatus: (arg0: number) => void; }, next: () => void) => {

            //check for role
            if (LEVELS[res.locals.user.role].includes(authLevel)) {

                /* istanbul ignore next */
                if (process.env.NODE_ENV !== 'test') {
                    console.info(`\x1b[36m\[server]: User:\x1b[35m${res.locals.user._id}\x1b[36m\ with authLevel:\x1b[35m${res.locals.user.role}\x1b[36m\ is authorized, now accesing:\x1b[32m${req.path}\x1b[0m`)
                }
                next()
            } else {
                res.sendStatus(403)
            }
        }
    }
}
