import { useState } from 'react';
import { DataGrid, Column, Editing} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';

const BooksDataGrid = () => {
    const [books, setBooks] = useState([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', condition: 'Good', availability: 'Available', ownedBy: 'John Doe' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', condition: 'Excellent', availability: 'Checked Out', ownedBy: 'Jane Smith' },
        { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', condition: 'Fair', availability: 'Available', ownedBy: 'Alice Johnson' },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', condition: 'Good', availability: 'Available', ownedBy: 'Bob Brown' },
    ]);

    /*const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch registered users
        axios.get('/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []); */

    const handleAddBook = () => {
        const newBook = { id: books.length + 1, title: '', author: '', genre: '', condition: '', availability: '', ownedBy: '' };
        setBooks([...books, newBook]);
    };

    const handleEditBook = (e) => {
        const updatedBooks = books.map(book => 
            book.id === e.data.id ? { ...book, ...e.data } : book
        );
        setBooks(updatedBooks);
    };

    return (
        <div>
            <Button text="Add Book" onClick={handleAddBook} />
            <DataGrid
                dataSource={books}
                keyExpr="id"
                onRowUpdated={handleEditBook}
                showBorders={true}
            >
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}
                    useIcons={true}
                >                    
                </Editing>
                <Column dataField="title" caption="Title" />
                <Column dataField="author" caption="Author" />
                <Column dataField="genre" caption="Genre" />
                <Column dataField="condition" caption="Condition" />
                <Column dataField="availability" caption="Availability" />
                <Column dataField="ownedBy" caption="Owned By" />
            </DataGrid>
        </div>
    );
};

export default BooksDataGrid;