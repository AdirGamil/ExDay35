const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { StarRating } from './dynamic-inputs/StarRating.jsx'
import { SelectRating } from './dynamic-inputs/SelectRating.jsx'
import { NumInputRating } from './dynamic-inputs/NumInputRating.jsx'
import { eventBusService } from '../services/event-bus.service.js'
import { bookService } from '../services/book.service.js'

export function AddReview() {
  const [review, setReview] = useState(bookService.getEmptyReview())

  const [cmpType, setCmpType] = useState('stars')
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

  function onChangeCmpType(selectedType) {
    setCmpType(selectedType)
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

        <div className="rate-by-choice">
          <p className="bold-txt">Select rating type:</p>
          <input
            name="rating"
            onChange={(ev) => onChangeCmpType(ev.target.value)}
            id="select"
            type="radio"
            value="select"
          />
          <label htmlFor="select">Select</label>

          <input
            name="rating"
            onChange={(ev) => onChangeCmpType(ev.target.value)}
            id="numInput"
            type="radio"
            value="numInput"
          />
          <label htmlFor="numInput">Number Input</label>

          <input
            name="rating"
            onChange={(ev) => onChangeCmpType(ev.target.value)}
            id="stars"
            type="radio"
            value="stars"
          />
          <label htmlFor="stars">Stars</label>
        </div>

        <label htmlFor="readAt">Read At:</label>
        <input
          type="date"
          id="readAt"
          name="readAt"
          value={readAt}
          onChange={handleChange}
        />

        <DynamicCmp
          cmpType={cmpType}
          handleChange={handleChange}
          rating={rating}
        />
        <button type="submit">Add Review</button>
      </form>
    </section>
  )
}

function DynamicCmp(props) {
  switch (props.cmpType) {
    case 'select':
      return <SelectRating {...props} />
    case 'numInput':
      return <NumInputRating {...props} />
    case 'stars':
      return <StarRating {...props} />
    default:
      return null
  }
}
