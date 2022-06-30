import RegionsModel from "../models/RegionsModel"
import CountryModel from "../models/CountryModel"
import BaseController from "./baseControllers/BaseController"

export default class RegionsController extends BaseController {

    public static async createRegion(req: { body: { countryId: string; regionName: string } }, res: any): Promise<void> {
        const { countryId, regionName } = req.body
        try {
            const region = await RegionsModel.create({ countryId, regionName, salaryHistory: [] })
            await region.save()
            await CountryModel.updateOne({countryId: countryId},{ $push: { regions: region } } )
            res.sendStatus(201)
        }
        catch (err: any | unknown) {
            res.status(400).json(RegionsController.handleErrors(err))
        }
    }

    public static async listRegion(req, res: any): Promise<void> {

        const regions = await RegionsModel.find({})

        if (regions) {
            res.status(200).json(regions)
        }
        else {
            res.sendStatus(400)
        }
    }
    
}