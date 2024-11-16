import express from 'express';
import { register, login, passwordReset, manageProfile, newPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/passwordReset', passwordReset);
router.post('/newPassword', newPassword);
router.post('/manageProfile', manageProfile);

export default router;
