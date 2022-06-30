import { Router } from 'express';
import Auth from "../../middleware/Auth"
import CountryController from "../../controllers/CountryController"

const router = Router();
router.get('/api/protected/countries', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  CountryController.listCountrie)
router.get('/api/protected/countries/:id', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  CountryController.listCountrie)
router.post('/api/protected/countries', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  CountryController.createCountry)
router.patch('/api/protected/countries/:id', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  CountryController.updateCountry)
router.delete('/api/protected/countries/:id', Auth.requireAuthetication, Auth.requireAuthorization("administrator"),  CountryController.deleteCountry)
module.exports = router;
