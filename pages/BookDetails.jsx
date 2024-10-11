import { LongTxt } from "../cmps/LongTxt.jsx";

export function BookDetails({ book, onGoBack , onGoEdit}){
    if (!book) return <div>Loading...</div>;
    


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


    console.log('book: ',book);

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
    console.log('book: ',book);
    
    console.log(book.title);

    
    if (!book) return <div>Loading...</div>

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
                        <button className="go-back-btn" onClick={onGoBack}>⬅ Go back</button>
                        <button className="go-edit-btn" onClick={onGoEdit}>Go Edit ➡</button>
                    </div>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Description:</span>
                    <LongTxt txt={description} />
                </div>
            </div>
        </section>
    )
}