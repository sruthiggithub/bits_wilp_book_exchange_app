import express from 'express';
import { addBook, getBooks,editBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

router.put('/:id', editBook);
router.delete('/:id', deleteBook);
router.post('/', addBook);
router.get('/', getBooks);

export default router;
