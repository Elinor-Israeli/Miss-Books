

export function BookDetails({ onBack ,bookId}){
    return (
        <section className="book-details">
            <h1>Title</h1>
            <h1>Price</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicin
                g elit. Minus nihil tenetur neque nam reiciendis, facere minima 
                deleniti blanditiis doloribus provident suscipit numquam maxime. 
                uibusdam ipsa ipsam ut rem nihil exercitationem?</p>
                <button onClick={onBack}>Back</button>

        </section>
    )
}