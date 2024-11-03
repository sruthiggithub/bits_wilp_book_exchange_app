import express from 'express';
import { addBook, getBooks } from '../controllers/bookController.js';

const router = express.Router();

router.post('/', addBook);
router.get('/', getBooks);

export default router;
