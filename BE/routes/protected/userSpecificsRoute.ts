import { Router } from 'express';
import Auth from "../../middleware/Auth"
import UserSpecificsController from "../../controllers/UserSpecificsController"

const router = Router();
router.patch('/api/protected/userSpecifics', Auth.requireAuthetication, Auth.requireAuthorization("administrator"), UserSpecificsController.updateSpecifics)
module.exports = router;
