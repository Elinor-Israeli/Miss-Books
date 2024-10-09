import { bookService} from ".../services/book.service.js"

const { useEffect, useState} = React

export function BookDetails({ onBack ,bookId}){

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
        .then(setBook)
        .catch(err=>{
            console.log('Problem getting book', err)
        })
    },[])

    if (!book) return <div>Loading...</div>

    const { title, listPrice } = book
    return (
        <section className="book-details">
            <h1>Title: {title}</h1>
            <h1>Price: {listPrice}</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicin
                g elit. Minus nihil tenetur neque nam reiciendis, facere minima 
                deleniti blanditiis doloribus provident suscipit numquam maxime. 
                uibusdam ipsa ipsam ut rem nihil exercitationem?</p>
                <button onClick={onBack}>Back</button>

        </section>
    )
}