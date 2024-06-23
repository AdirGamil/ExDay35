import { BookPreview } from '../cmps/BookPreview.jsx'

const { useState } = React

export function BookList({ books, onSelectBookId }) {

  return (
    <section className="books-list">
      {books.map((book) => (
        <div key={book.id}>
          <BookPreview book={book} />
          <button onClick={() => onSelectBookId(book.id)}>Details</button>
        </div>
      ))}
    </section>
  )
}
