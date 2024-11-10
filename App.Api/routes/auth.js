import express from 'express';
import { register, login, passwordReset, manageProfile, clickResetPasswordLink } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/passwordReset', passwordReset);
router.post('/clickResetPasswordLink', clickResetPasswordLink);
router.post('/manageProfile', manageProfile);

export default router;
