import ErrorInternals from "../utils/ErrorInternals"
import CountryModel from "../models/CountryModel"
import BaseController from "./baseControllers/BaseController"

export default class CountryController extends BaseController {

    public static async listCountrie(req: { params: { id: string } }, res: any,): Promise<void> {
        const { id } = req.params

        try {
            const countries = id ? await CountryModel.findById(id).populate("regions") : await CountryModel.find({}).populate(["regions"])
            
            if(!countries && process.env.NODE_ENV !== 'test') {
                res.sendStatus(404)
                new ErrorInternals.DBNotFoundError(`countryiD: ${id}`, id)
            } else {
                res.status(200).json(countries)
            }

        }
       catch (err) {
            res.status(500).json(CountryController.handleErrors(err) , err)
        }
    }

    public static async createCountry(req: any, res: any): Promise<void> {
        const { countryId, countryCodeCurrency, locales } = req.body

        try {
            const country = await CountryModel.create({ countryId, countryCodeCurrency, regions: [], locales })
            res.status(201).json( country._id )
        }
        catch (err: any | unknown) {
            res.status(400).json(CountryController.handleErrors(err))
        }
    }

    public static async updateCountry(req: any, res: any): Promise<void> {
        const { id } = req.params
        const { changes } = req.body

        try {
            await CountryModel.updateOne({"_id": id}, { $set:  { ...changes } })
            res.sendStatus(204)
        }
        catch (err: any | unknown) {
            res.status(400).json(CountryController.handleErrors(err))
        }
    }

    public static async deleteCountry(req: any, res: any): Promise<void> {
        const { id } = req.params

        try {
            await CountryModel.deleteOne({"_id": id})
            res.sendStatus(204)
        }
        catch (err: any | unknown) {
            res.status(400).json(CountryController.handleErrors(err))
        }
    }

}