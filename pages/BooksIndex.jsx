import { BookList } from "../cmps/BookList.jsx"
import { bookService} from ".../services/book.service.js"
const {useState, useEffect} = React

export function BooksIndex(){

    const [books, setBooks] = useState(null)
    
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

    if(!books) return <div>Loading</div>
    return (
        <section className="books-index">
         <BookList books={books}/>
        </section>
    )
}
