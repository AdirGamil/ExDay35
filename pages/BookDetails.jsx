const { useParams, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null)
  const { bookIdd } = useParams()

  useEffect(() => {
    bookService.get(bookId).then((book) => setBook(book))
  }, [bookIdd])

  if (!book) return <div>Loading...</div>

  return (
    <section className="book-details">
      <h1>Title: {book.title}</h1>
      <p>ID: {book.id}</p>
      <p>Subtitle: {book.subtitle}</p>
      <p>Authors: {book.authors.join(', ')}</p>
      <p>Published Date: {book.publishedDate}</p>
      <p>Description: {book.description}</p>
      <p>Page Count: {book.pageCount}</p>
      <p>Categories: {book.categories.join(', ')}</p>
      {/* <img src={book.thumbnail} alt={book.title} /> */}
      <p>Language: {book.language}</p>
      <p>
        List Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <p>Status: {book.listPrice.isOnSale ? 'On Sale' : 'Not on Sale'}</p>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
