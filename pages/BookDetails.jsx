const { useParams, Link } = ReactRouterDOM

const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'
import { AddReview } from '../cmps/AddReview.jsx'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const { bookId } = useParams()

  useEffect(() => {
    loadBook()
    loadReviews()
  }, [bookId])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => setBook(book))
      .catch((err) => console.error('Error loading book:', err))
  }

  function loadReviews() {
    bookService
      .getReviews(bookId)
      .then((reviews) => setReviews(reviews))
      .catch((err) => console.error('Error loading reviews:', err))
  }

  if (!book) return <div>Loading...</div>

  // const currentBook = books[currentIndex];
  // const previousBook = books[currentIndex - 1 < 0 ? books.length - 1 : currentIndex - 1];
  // const nextBook = books[(currentIndex + 1) % books.length];

  return (
    <section className="book-details">
      <h1>Title: {book.title}</h1>
      <p>ID: {book.id}</p>
      <p>IDX: {book.idx}</p>
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

      <button>
        <Link to="/books">Back</Link>
      </button>

      <button>
        <Link to={`/books/${book.idx}`}>Next</Link>
      </button>

      <button>
        <Link to={`/books/review/${book.id}`}>Add Review</Link>
      </button>

      <div className="reviews-list">
        <h2>Reviews:</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>Reviewer: {review.fullname}</p>
                <p>Rating: {review.rating}</p>
                <p>Read At: {review.readAt}</p>
                <button onClick={() => deleteReview(review.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </section>
  )
}
