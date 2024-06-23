const { useEffect, useState } = React

import { BookService } from '../services/book.service.js'

export function BookIndex() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    BookService.query()
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log('err:', err)
      })
  }

  return (
    <section className="books-list">
      {books.map((book) => (
        <div key={book.id}>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          <img src={book.thumbnail} alt={book.title} />
          <p>
            {book.listPrice.amount} {book.listPrice.currencyCode}
          </p>
        </div>
      ))}
    </section>
  )
}
