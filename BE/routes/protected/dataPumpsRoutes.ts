import { Router } from 'express';
import Auth from "../../middleware/Auth"
import DataPumpsController from "../../controllers/DataPumpsController"

const router = Router();
router.post('/api/protected/DataPumps/metadata', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  DataPumpsController.createDataPumpMetadata)
router.post('/api/protected/DataPumps/:pumpId/runPump', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  DataPumpsController.runPump)
module.exports = router;
