import { useState } from 'react';
import { DataGrid, Column, Editing } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';

const BooksDataGrid = () => {
    const [books, setBooks] = useState([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
        { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
    ]);

    const handleAddBook = () => {
        const newBook = { id: books.length + 1, title: '', author: '', year: null };
        setBooks([...books, newBook]);
    };

    const handleEditBook = (e) => {
        const updatedBooks = books.map(book => 
            book.id === e.data.id ? { ...book, ...e.data } : book
        );
        setBooks(updatedBooks);
    };

    const handleRemoveBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <div className="container mt-5">
        <h2>Books List</h2>
        <Button text="Add Book" onClick={handleAddBook} />
        <DataGrid
            dataSource={books}
            keyField="id"
            showBorders={true}
            onRowUpdated={handleEditBook}
            onRowRemoved={(e) => handleRemoveBook(e.data.id)}
        >
            <Editing
                allowAdding={true}
                allowUpdating={true}
                allowDeleting={true}
                addMode="form"
                //mode="row"
            />
            <Column dataField="title" caption="Title" />
            <Column dataField="author" caption="Author" />
            <Column dataField="year" caption="Year" />
        </DataGrid>
     </div>
    );
};

export default BooksDataGrid;
