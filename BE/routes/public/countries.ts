import { Router } from 'express';
import CountryModel from "../../models/Country"

const router = Router();

router.get('/api/public/countries', (req, res) => {
    CountryModel.find( {},  (err: Error, result: Array<typeof CountryModel>) => {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});

module.exports = router;