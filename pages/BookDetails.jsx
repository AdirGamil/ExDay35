import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({bookId, onBack}) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
        .then(book => setBook(book))
    }, [])

    if(!book) return <div>Loading...</div>

    console.log('hi');
    return (
<section className="book-details">
            <h1>Titleee: {book.title}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}