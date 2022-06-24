import { Router } from 'express';
import UserController from '../../controllers/UserController';

const router = Router();

router.post('/api/public/userRegister', UserController.registerUser )
router.post('/api/public/userLogin', UserController.loginUser )
router.get('/api/public/userLogout', UserController.logoutUser )

module.exports = router;
export default router;
