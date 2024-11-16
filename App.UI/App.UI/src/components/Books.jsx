import { useState, useEffect, memo } from 'react';
import { DataGrid, Column, Editing, SearchPanel, Scrolling, FilterRow } from 'devextreme-react/data-grid';
import HttpClient from '../clients/httpClient';

const httpClient = new HttpClient();

const Books = () => {
    const [books, setBooks] = useState([
        // { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', condition: 'Good', availability: 'Available', ownedBy: 'John Doe' },
        // { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', condition: 'Excellent', availability: 'Checked Out', ownedBy: 'Jane Smith' },
        // { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', condition: 'Fair', availability: 'Available', ownedBy: 'Alice Johnson' },
        // { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', condition: 'Good', availability: 'Available', ownedBy: 'Bob Brown' },
    ]);   

    const [users, setUsers] = useState([])

    useEffect(() => {
        // Fetch all books
        httpClient.get('books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));

        // fetch all users
        httpClient.get('users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);   

    const handleAddBook = (e) => {
        const newBook = e.data;
        httpClient.post('books', newBook)
            .then(response => {
                setBooks([...books, response.data]);
            })
            .catch(error => console.error('Error adding book:', error));
    };

    const handleEditBook = (e) => {
        const updatedBook = e.data;
        httpClient.put(`books/${updatedBook._id}`, updatedBook)
            .then(response => {
                const updatedBooks = books.map(book => 
                    book._id === updatedBook._id ? response.data : book
                );
                setBooks(updatedBooks);
            })
            .catch(error => console.error('Error updating book:', error));
    };

    const handleDeleteBook = (e) => {
        const bookId = e.data._id;
        httpClient.delete(`books/${bookId}`)
            .then(() => {
                const updatedBooks = books.filter(book => book._id !== bookId);
                setBooks(updatedBooks);
            })
            .catch(error => console.error('Error deleting book:', error));
    };

    const handleSearch = (searchValue) => {
        httpClient.get(`books?search=${searchValue}`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error searching books:', error));
    };

    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };


    useEffect(() => {
        if (searchValue) {
            handleSearch(searchValue);
        } else {
            httpClient.post('books')
                .then(response => setBooks(response.data))
                .catch(error => console.error('Error fetching books:', error));
        }
    }, [searchValue]);

    return (
        <div>            
            <DataGrid
                dataSource={books}
                keyExpr="_id"
                onRowUpdated={handleEditBook}
                showBorders={true}
                allowFiltering={true}
                allowSearching={true}
                allowSorting={true}
                allowColumnResizing={true}
            >
                <FilterRow visible={true} />
                <SearchPanel visible={true}/>
                <Scrolling mode="virtual" />
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}    
                    useIcons={true}
                    onRowInserting={handleAddBook}
                    onRowUpdating={handleEditBook}
                    onRowRemoving={handleDeleteBook}
                >                    
                </Editing>
                <Column dataField="title" caption="Title" />
                <Column dataField="author" caption="Author" />
                <Column dataField="genre" caption="Genre" />
                <Column dataField="condition" caption="Condition" />
                <Column dataField="availability" caption="Availability" />
                <Column allowEditing={false} allowAdding={false} dataField="ownedBy" caption="Owned By" />                  
            </DataGrid>
        </div>
    );
};

export default memo(Books);