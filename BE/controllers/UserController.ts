import UserModel from "../models/UserModel"
import UserSpecificsModel from "../models/UserSpecificsModel"
import Auth from "../middleware/Auth"
import BaseController from "./baseControllers/BaseController"

export default class UserController extends BaseController {

    public static async registerUser(req: any, res: any): Promise<void> {
        const { name, surname, email, password, role, language } = req.body

        try {
            const USER = await UserModel.create({ name, surname, email, password, role, language, registrationDate: new Date() })
            const USERDATA = await (await UserSpecificsModel.create({ userId: USER._id, salary: 0 })).save()
            const TOKEN = Auth.createToken(USER._id)
            res.cookie("jwt", TOKEN, { httpOnly: true, maxAge: Auth.maxDuration * 1000 })
            res.status(201).json({ userID: USER._id, userDataId: USERDATA._id })
        }
        catch (err: any | unknown) {
            res.status(400).json(UserController.handleErrors(err))
        }
    }

    public static async loginUser(req: any, res: any): Promise<void> {
        const { email, password } = req.body
        try {
            const USER = await UserModel.login(email, password)
            const TOKEN = Auth.createToken(USER._id)
            res.cookie("jwt", TOKEN, { httpOnly: true, maxAge: Auth.maxDuration * 1000 })
            res.status(200).json({ user: USER._id })
        }
        catch (err: any) {
            res.status(403).json(UserController.handleErrors(err))
        }
    }

    public static async logoutUser(req: any, res: any): Promise<void> {
        res.cookie("jwt", null, { maxAge: 1 })
        res.redirect("/")
    }
    
}