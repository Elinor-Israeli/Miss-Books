import { BooksPreview } from "./BooksPreview.jsx";

export function BookList({books, onRemoveBook, onSelectBookId}){

    return(
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BooksPreview book={book}/>
                    <section>
                    <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                    <button onClick={() => onSelectBookId(book.id)}>Select</button>
                    </section>
                </li>
            )}
        </ul>
    )
}