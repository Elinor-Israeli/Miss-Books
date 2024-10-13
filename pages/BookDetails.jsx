
const { useParams, useNavigate, Link } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
const { useEffect, useState } = React



export function BookDetails(){
    
    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    console.log('bookId:', bookId);
    console.log('book:', book);
    const navigate = useNavigate()
    console.log('bookId:', bookId);
    console.log('book:', book);


    useEffect(() => {
        if (bookId)
            loadBook()
    }, [bookId])

    function loadBook() {
        bookService.getById(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onBack() {
        navigate('/book')
    }

    function getBookLng(lng) {
        switch (lng) {
            case 'he':
                return 'Hebrew'
            case 'sp':
                return 'Spanish'
            default:
                return 'English'
        }
    }

    function getPublishDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        const diff = currYear - publishedYear
        if (diff > 10) publishedYear += ' - Vintage';
        else if (diff < 10) publishedYear += ' - NEW!'
        return publishedYear
    }

    function getPageCount() {
        // Switch case is fine
        let pageCount = book.pageCount
        if (book.pageCount > 500) pageCount += ' - Long reading'
        else if (book.pageCount > 200) pageCount += ' - Decent reading'
        else if (book.pageCount < 100) pageCount += ' - Light reading'
        return pageCount
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
        return ''
    }


    if (!book) return <div>Loading...</div>
    const {
        title,
        subtitle,
        thumbnail,
        authors,
        description,
        language,
        categories,
        listPrice
    } = book
    
    console.log(book.title);

    
 

    return (
        <section className="book-details-container">
            <div className="book-details-title">{title}</div>
            <div className="book-details-subtitle">{subtitle}</div>
            <div className="book-thumbnail-container">
                {listPrice.isOnSale && <div className="book-details-on-sale">On-sale!</div>}
                <img src={thumbnail} />
            </div>

            <div className="book-details-info">

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Year publish:</span>
                    <span className="book-details-info-text">{getPublishDate()}</span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Author{(authors.length > 1) ? 's' : ''}:</span>
                    <span className="book-details-info-text">{authors.join(', ')}</span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Language:</span>
                    <span className="book-details-info-text">{getBookLng(language)}</span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Categories:</span>
                    <span className="book-details-info-text">{categories.join(', ')}</span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Pages:</span>
                    <span className="book-details-info-text">{getPageCount()}</span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Price:</span>
                    <span className={"book-details-info-text " + getPriceClass()}>
                        {listPrice.amount} {listPrice.currencyCode}
                    </span>
                </div>

                <div className="book-details-buy-container">
                    {(book.listPrice.isOnSale) &&
                        <button className="buy-book-btn" onClick={() => alert(`HA! ma ze po hanut?`)}>
                            Buy it now!
                        </button>
                    }
                    <div className="actions-btns">
                        <button className="go-back-btn" onClick={onBack} >⬅ Go back</button>
                    </div>
                </div>
                <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Description:</span>
                    <LongTxt txt={description} />
                </div>
            </div>
        </section>
    )
}