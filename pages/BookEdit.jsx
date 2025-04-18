const { useEffect, useState } = React
const { useNavigate, useParams, Link } = ReactRouterDOM
import { bookService } from '../services/book.service.js'

export function BookEdit() {

    const { bookId } = useParams()
    const navigate = useNavigate()
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        bookService
            .getById(bookId)
            .then((res) => {
                showSuccessMsg(`successfully loaded ${bookId}`)
                setBookToEdit(res)
            })
            .catch((err) => {
                console.log(`${err} error problom getting car`)
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleListPriceChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...book.listPrice, [field]: value } }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        onUpdate(bookToEdit)
    }
    function onBack() {
        navigate('/book')
    }
    if (!bookToEdit) return <div>loading...</div>
    return (
        <section className='book-edit'>
            <h2 className='edit-book-header'>Edit Book</h2>
            <form onSubmit={onSaveBook}>
                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Title:</label>
                    <input
                        type='text'
                        placeholder='Enter New Title'
                        name='title'
                        value={bookToEdit.title}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Description:</label>
                    <textarea
                        type='text'
                        placeholder='Enter New Title'
                        name='description'
                        value={bookToEdit.description}
                        onChange={handleChange}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>Price:</label>
                    <input
                        type='number'
                        placeholder='Set Price'
                        name='amount'
                        onChange={handleListPriceChange}
                        value={bookToEdit.listPrice.amount}
                    />
                </div>

                <div className='book-details-info-row'>
                    <label className='book-details-info-title'>On Sale:</label>
                    <input
                        type='checkbox'
                        placeholder='Set Price'
                        name='isOnSale'
                        onChange={handleListPriceChange}
                        checked={bookToEdit.listPrice.isOnSale}
                    />
                </div>

                <div className='book-edit-actions-container'>
                    <button className='save-edit-btn' 
                    onClick={onSaveBook}
                    >
                        Save ✔
                    </button>
                    <button
                        type='button'
                        className='cancel-edit-btn'
                        onClick={onBack}
                    >
                        Cancel ✖
                    </button>
                </div>

            </form>
        </section>
    )
}
