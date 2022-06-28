import BaseController from "./baseControllers/BaseController"
import DataPumpsModel from "../models/DataPumpsModel"

/**
 * DataPumpsController is main controller for handeling data pumps operation, such as creating, running, updating, listing etc.
 * @author Alan Kovac
 */

export default class DataPumpsController extends BaseController {

    public static async createDataPumpMetadata(req: any, res: any) {
        const { name, producer, baseUri  } = req.body

        try {
            const dataPumps = await DataPumpsModel.create({name, status: "NEW", type: "UNKNOWN", producer, baseUri, lastRunned: null, lastFinished: null})
            res.status(201).json( { _id: dataPumps._id })

        } catch (err: any) {
           res.status(400).json(DataPumpsController.handleErrors(err))
        }
    }

}