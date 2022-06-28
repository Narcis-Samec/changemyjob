import { Router } from 'express';
import Auth from "../../middleware/Auth"
import DataPumpsController from "../../controllers/DataPumpsController"

const router = Router();
router.post('/api/protected/DataPumps/createMetadata', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  DataPumpsController.createDataPumpMetadata)
module.exports = router;
