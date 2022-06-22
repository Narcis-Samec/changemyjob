
import jwt from "jsonwebtoken"

class Auth {
    public static maxDuration = 259200; //in seconds - 259200 = 3 days

    public static createToken(_id: string): string | void {
        return jwt.sign({_id}, "super secret", {
            expiresIn: this.maxDuration
        })
    }

    public static requireAuth(req: { cookies: { jwt: string | void; }; }, res: { redirect: (arg0: string) => void; }, next: () => void) {
        const TOKEN = req.cookies.jwt;

        if(TOKEN) {
            jwt.verify(TOKEN, "super secret", (err: Error, decodedToken: any) => {
                if(err) {
                    console.log(err.message)
                    res.redirect("/")
                } else {
                    console.log(decodedToken)
                    next();
                }
            })
        } else {
            res.redirect("/")
        }
    }
}

export default Auth;