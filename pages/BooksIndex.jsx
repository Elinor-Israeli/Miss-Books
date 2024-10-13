import { BookList } from "../cmps/BookList.jsx"
import { UserMsg } from "../cmps/UserMsg.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { bookService } from ".../services/book.service.js"
import { BookEdit } from './BookEdit.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function BooksIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSelectBookId(bookId) {
        bookService.getById(bookId).then(setSelectedBook)
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterByToEdit}))
    }

    function onUpdateBook(bookToSave) {
        bookService.save(bookToSave)
            .then((savedBook) => {
                setSelectedBook(savedBook)
                setIsEdit(false)
                setBooks(prevBooks => (
                    prevBooks.map(book => book.id === savedBook.id ? savedBook : book)
                ))
            })
    }


    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books =>
                    books.filter(book => book.id !== bookId)
                )
                showSuccessMsg('Book removed successfully')
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg(`Problems removing book (${bookId})`)
            })
    }

    if (!books) return <div>Loading</div>


    return (
        <main>
            {!selectedBook && (
                <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    {!!books.length && <BookList books={books} onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} />}
                    {!books.length && <div> No Books found...</div>}
                   
                </React.Fragment>
                 
            )}
             
            
            {selectedBook && (
                <section>
                    {isEdit
                        ? <BookEdit
                            book={selectedBook}
                            onUpdate={onUpdateBook}
                            onCancelEdit={() => setIsEdit(false)}
                        />
                        : <BookDetails
                            book={selectedBook}
                            onGoBack={() => setSelectedBook(null)}
                            onGoEdit={() => setIsEdit(true)}
                        />}
                </section>
            )}
        </main>
    )
}
