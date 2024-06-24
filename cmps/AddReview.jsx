const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { eventBusService } from '../services/event-bus.service.js'
import { bookService } from '../services/book.service.js'

export function AddReview() {
  const [review, setReview] = useState(bookService.getEmptyReview())

  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) loadBook()
  }, [bookId])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        setReview((prevReview) => ({
          ...prevReview,
          fullname: book.title,
        }))
      })
      .catch((err) => console.log('err:', err))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .addReview(bookId, review)
      .then(() => {
        navigate(`/books/${bookId}`)
        showSuccessMsg(`Review added successfully!`)
      })
      .catch((err) => console.error('Error adding review:', err))
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }))
  }

  const { fullname, rating, readAt } = review
  return (
    <section className="book-edit-container">
      <form onSubmit={onSaveBook}>
        <label htmlFor="fullname">Full Name:</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={fullname}
          onChange={handleChange}
        />

        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          name="rating"
          value={rating}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="readAt">Read At:</label>
        <input
          type="date"
          id="readAt"
          name="readAt"
          value={readAt}
          onChange={handleChange}
        />

        <button type="submit">Add Review</button>
      </form>
    </section>
  )
}
