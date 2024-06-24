const { Link } = ReactRouterDOM

import { BookPreview } from '../cmps/BookPreview.jsx'

export function BookList({ books }) {
  return (
    <section className="books-list">
      {books.map((book) => (
        <div key={book.id}>
          <BookPreview book={book} />
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
