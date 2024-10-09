import { BooksPreview } from "./BooksPreview.jsx";

export function BookList({books}){

    return(
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BooksPreview />
                    <section>
                        <button>Remove</button>
                        <button>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}