
export function BooksPreview({ book }) {

    return (
        <article className="book-preview">
            <h2> Title : {book.title}</h2>
            <h4>Price : {book.listPrice.amount}</h4>
            <img src={book.thumbnail} alt="Book Image"/>
        </article>
    )

}