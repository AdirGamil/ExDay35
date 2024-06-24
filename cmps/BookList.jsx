const { Link } = ReactRouterDOM

import { BookPreview } from '../cmps/BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <section className="books-list">
      {books.map((book) => (
        <div key={book.id}>
          <BookPreview book={book} />
          <button onClick={() => onRemoveBook(book.id)}>Remove</button>

          <button>
            <Link to={`/books/${book.id}`}>Details</Link>
          </button>
          <button>
            <Link to={`/books/edit/${book.id}`}>Edit</Link>
          </button>
        </div>
      ))}
    </section>
  )
}
