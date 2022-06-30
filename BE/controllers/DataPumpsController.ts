import BaseController from "./baseControllers/BaseController"
import DataPumpsModel from "../models/DataPumpsModel"
import CSUPump from "../services/CSUPump";
import RegionsModel from "../models/RegionsModel";

/**
 * DataPumpsController is main controller for handeling data pumps operation, such as creating, running, updating, listing etc.
 * @author Alan Kovac
 */
export default class DataPumpsController extends BaseController {

    static pumpList: { CSUPump: CSUPump }

    public static async createDataPumpMetadata(req: any, res: any) {
        const { name, producer, baseUri } = req.body

        try {
            const dataPumps = await DataPumpsModel.create({ name, status: "NEW", type: "UNKNOWN", typeName: "", producer, baseUri, lastRunned: null, lastFinished: null })
            res.status(201).json({ _id: dataPumps._id })

        } catch (err: any) {
            res.status(400).json(DataPumpsController.handleErrors(err))
        }
    }

    public static async runPump(req: { params: { pumpId: string; }; }, res: any) {
        const { pumpId } = req.params

        const pumpMeta = await DataPumpsModel.findById({ _id: pumpId })

        if (!pumpMeta) {
            res.sendStatus(404)
        }
        else {
            const pump = new CSUPump(pumpMeta.name, pumpMeta.baseUri)
            const data = pump.runPump()

            res.sendStatus(200)
        }
    }
}