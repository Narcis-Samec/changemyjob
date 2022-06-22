import { Router } from 'express';
import Auth from "../../middleware/Auth"

const router = Router();

router.get('/api/protected/test', Auth.requireAuth, (req, res) => {
    res.json("this is protected")
})
module.exports = router;
