import express from 'express';
import { register, login, passwordReset, manageProfile, newPassword, getUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/user', getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/passwordReset', passwordReset);
router.post('/newPassword', newPassword);
router.put('/manageProfile', manageProfile);

export default router;
