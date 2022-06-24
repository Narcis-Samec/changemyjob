import UserSpecificsModel from "../models/UserSpecificsModel"

export default class UserSpecificsController {

    public static async updateSpecifics(req: any, res: any) {
        const { CHANGES } = req.body
        //console.log(res.locals.user._id)
        await UserSpecificsModel.updateOne({"userId": res.locals.user._id}, { $set: { ...CHANGES }});
        res.status(201).send()
    }

}