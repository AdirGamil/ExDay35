const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React
import { bookService } from '../services/book.service.js'

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => console.log('err:', err))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .save(bookToEdit)
      .then(() => {
        navigate('/books')
        showSuccessMsg(`Book saved successfully!`)
      })
      .catch((err) => console.log('err:', err))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
  }

  const {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    language,
  } = bookToEdit
  return (
    <section className="book-edit-container">
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="subtitle">SubTitle</label>
        <input
          onChange={handleChange}
          value={subtitle}
          type="text"
          name="subtitle"
          id="subtitle"
        />

        <label htmlFor="authors">Authors</label>
        <input
          onChange={handleChange}
          value={authors}
          type="text"
          name="authors"
          id="authors"
        />

        <label htmlFor="publishedDate">Published Date</label>
        <input
          onChange={handleChange}
          value={publishedDate}
          type="date"
          name="publishedDate"
          id="publishedDate"
        />

        <label htmlFor="description">Description</label>
        <textarea
          onChange={handleChange}
          value={description}
          name="description"
          id="description"
        ></textarea>

        <label htmlFor="pageCount">Page Count</label>
        <input
          onChange={handleChange}
          value={pageCount}
          type="number"
          name="pageCount"
          id="pageCount"
        />

        <label htmlFor="categories">Categories</label>
        <input
          onChange={handleChange}
          value={categories}
          type="text"
          name="categories"
          id="categories"
        />

        <label htmlFor="language">Language</label>
        <input
          onChange={handleChange}
          value={language}
          type="text"
          name="language"
          id="language"
        />

        <button>Save</button>
      </form>
    </section>
  )
}
