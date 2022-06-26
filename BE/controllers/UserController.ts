import UserModel from "../models/UserModel"
import UserSpecificsModel from "../models/UserSpecificsModel"
import Auth from "../middleware/Auth"

//handle errors
/*
const handleErrors = (err: any) => {
    console.error(`\x1b[31m[DB]:${err.message}`)
    console.error(`\x1b[31m[DB]:error code:${err.code}`)
}*/

export default class UserController {

    public static async registerUser(req: any, res: any) {
        const { name, surname, email, password, role, language } = req.body

        try {
            const USER = await UserModel.create({name, surname, email, password, role, language, registrationDate: new Date()})
            const USERDATA =  await ( await UserSpecificsModel.create({userId: USER._id, salary: 0})).save()
            const TOKEN = Auth.createToken(USER._id)
            res.cookie("jwt", TOKEN, { httpOnly: true, maxAge: Auth.maxDuration * 1000 })
            res.status(201).json({userID: USER._id, userDataId: USERDATA._id})
        }
        catch (err: any | unknown) {
            res.status(400).json(err)
        }
    }

    public static async loginUser(req: any, res: any) {
        const { email, password } = req.body

        try {
            const USER = await UserModel.login(email, password)
            const TOKEN = Auth.createToken(USER._id)
            res.cookie("jwt", TOKEN, { httpOnly: true, maxAge: Auth.maxDuration * 1000 })
            res.status(200).json({user: USER._id})
        }
        catch (err: any | unknown) {
            //console.log(err)
            res.status(403).json(err)
        }
    }

    public static async logoutUser(req: any, res: any) {
        res.cookie("jwt", null, { maxAge: 1 })
        res.redirect("/")
    }
}