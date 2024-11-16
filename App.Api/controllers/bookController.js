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
        const books = await Book.find().populate('owner', ['username', '_id']);
        res.json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id)
     
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.deleteOne()
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const editBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, condition, availability } = req.body;
    try {
        const book = await Book.findById(id)

        const owner = req.user.id 

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.updateOne({ title, author, genre, condition, availability, owner });
        res.json(book);
    } catch (error)  {
        return res.json(400).json({ message: error.message });
    }
}

