import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { bookService} from ".../services/book.service.js"

const {useState, useEffect} = React

export function BooksIndex(){

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

    
    useEffect(() =>{
        loadBooks()
    }, [])

    function loadBooks(){
        bookService.query()
            .then(setBooks)
            .catch(err=>{
                console.log('err:', err)
            })
    }

    function onSelectBookId(bookId){
        setSelectedBookId(bookId)
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

    if(!books) return <div>Loading</div>
    
    return (
        <section className="books-index">
            {!selectedBookId
                ? <BookList onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} books={books}/>
                : <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
            }
        
        </section>
    )
}
