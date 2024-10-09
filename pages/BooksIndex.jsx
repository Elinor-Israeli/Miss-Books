import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { bookService } from ".../services/book.service.js"

const { useState, useEffect } = React

export function BooksIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


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
        setSelectedBookId(bookId)
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({...prevFilter, ...filterByToEdit}))
    }


    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books =>
                    books.filter(book => book.id !== bookId)
                )
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    if (!books) return <div>Loading</div>

    return (
        <section className="books-index">
            {!selectedBookId
                ? <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    <BookList onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} books={books} />
                </React.Fragment>
                : <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
            }

        </section>
    )
}
