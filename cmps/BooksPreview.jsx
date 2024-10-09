
export function BooksPreview({ book }) {

    const { title, listPrice } = book
    return (
        <article className="book-preview">
            <h2> Title:{title}</h2>
            <h4>Price:{listPrice}</h4>
            <img src={`../assets/img/BooksImages/${title}.jpg`} alt="Book Image"/>
        </article>
    )

}