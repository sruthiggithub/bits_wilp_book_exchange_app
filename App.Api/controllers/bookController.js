import Book from '../models/Book.js';

export const addBook = async (req, res) => {
    const { title, author, genre, condition } = req.body;
    const newBook = new Book({ title, author, genre, condition, owner: req.user.id });
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

