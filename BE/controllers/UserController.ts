import UserModel from "../models/UserModel"
import Auth from "../middleware/auth"

//handle errors
const handleErrors = (err: any) => {
    console.error(`\x1b[31m[DB]:${err.message}`)
    console.error(`\x1b[31m[DB]:error code:${err.code}`)
}

class UserController {

    public static async registerUser(req, res) {
        const { name, surname, email, password } = req.body

        try {
            const USER = await UserModel.create({name, surname, email, password})
            const token = Auth.createToken(USER._id)
            res.cookie("jwt", token, { httpOnly: true, maxAge: Auth.maxDuration * 1000 })
            res.status(201).json(USER._id)
        }
        catch (err: unknown) {
            handleErrors(err)
            res.status(400).send(err)
        }
    }

    public static async loginUser(req, res) {
        const { email, password } = req.body

        try {
            const USER = await UserModel.login(email, password)
            const token = Auth.createToken(USER._id)
            res.cookie("jwt", token, { httpOnly: true, maxAge: Auth.maxDuration * 1000 })
            res.status(200).json({user: USER._id})
        }
        catch (err: unknown) {
            handleErrors(err)
            res.status(400).send(err)
        }
    }

    public static async logoutUser(req, res) {
        res.cookie("jwt", null, { maxAge: 1 })
        res.redirect("/")
    }
}

export default UserController