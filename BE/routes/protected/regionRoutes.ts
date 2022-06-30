import { Router } from 'express';
import Auth from "../../middleware/Auth"
import RegionsController from "../../controllers/RegionsController"

const router = Router();
router.post('/api/protected/regions', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  RegionsController.createRegion)
router.get('/api/protected/regions', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  RegionsController.listRegion)
module.exports = router;
