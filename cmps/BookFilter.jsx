const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    const { txt, minPrice } = filterByToEdit
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }



    return (
        <section className="book-filter">
            <h2>Filter our books</h2>
            <form>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="minPrice">Price</label>
                <input onChange={handleChange} value={minPrice} type="number" name="minPrice" id="minPrice" />

                <button>Submit</button>
            </form>
        </section>
    )
}