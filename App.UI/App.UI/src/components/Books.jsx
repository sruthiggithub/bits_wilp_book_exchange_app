import { useState, useEffect, memo } from 'react';
import { DataGrid, Column, Editing, SearchPanel, Scrolling, FilterRow, Paging, Pager } from 'devextreme-react/data-grid';
import HttpClient from '../clients/httpClient';

const httpClient = new HttpClient();

const Books = () => {
    const [books, setBooks] = useState([]); 

    useEffect(() => {
        // Fetch all books
        httpClient.get('books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));       
    }, []);   

    const handleAddBook = (e) => {
        const newBook = e.data;
        httpClient.post('books', newBook)            
            .catch(error => console.error('Error adding book:', error));
    };

    const handleEditBook = (e) => {
        const updatedBook ={            
            title: e.newData?.title ?? e.oldData.title,
            author: e.newData?.author ?? e.oldData.author,
            condition: e.newData?.condition ?? e.oldData.condition,
            availability: e.newData?.availability ?? e.oldData.availability,
            owner: e.oldData?.owner,            
        };
        httpClient.put(`books/${e.key}`, updatedBook)
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

    return (
        <div>            
            <DataGrid
                dataSource={books}
                keyExpr="_id"
                onRowInserting={handleAddBook}
                onRowUpdating={handleEditBook}
                onRowRemoving={handleDeleteBook}
                showBorders={true}
                allowFiltering={true}
                allowSearching={true}
                allowSorting={true}
                allowColumnResizing={true}
                height={200}
                rowAlternationEnabled={true}
            >
                <FilterRow visible={true} />
                <SearchPanel visible={true}/>
                <Scrolling mode="virtual" />
                <Editing
                    mode="popup"
                    title={"Book Details"}
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}    
                    useIcons={true}                   
                >                    
                </Editing>
                <Paging enabled={true} pageSize={4} />
                <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={[4, 8, 20]} showInfo={true} />
                <Column dataField="title" caption="Title" />
                <Column dataField="author" caption="Author" />
                <Column dataField="genre" caption="Genre" />
                <Column dataField="condition" caption="Condition" />
                <Column dataField="availability" caption="Availability" />
                <Column allowEditing={false} allowAdding={false} dataField="owner.username" caption="Owned By" />                  
            </DataGrid>
        </div>
    );
};

export default memo(Books);