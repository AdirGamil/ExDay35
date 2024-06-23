import { BookService } from '../services/book.service.js'
const { useState } = React

export function BookList({ books }) {
  return (
    <section className="books-list">
      {books.map((book) => (
        <div key={book.id}>
          <h1></h1>
        </div>
      ))}
    </section>
  )
}
