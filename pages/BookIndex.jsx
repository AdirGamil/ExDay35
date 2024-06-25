import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from '../services/event-bus.service.js'
import { BookDetails } from '../pages/BookDetails.jsx'

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultFilter = bookService.getFilterFromSearchParams(searchParams)

  const [filterBy, setFilterBy] = useState(defaultFilter)

  useEffect(() => {
    setSearchParams(filterBy)
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        console.error('Error loading books:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book (${bookId}) removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing book:', err)
        showErrorMsg(`Having problems removing book!`)
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className="books-index">
      <button>
        <Link to="/books/edit">Add Book</Link>
      </button>
      <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <BookList
        books={books}
        onSelectBookId={onSelectBookId}
        onRemoveBook={onRemoveBook}
      />

      {selectedBookId && (
        <BookDetails
          onBack={() => setSelectedBookId(null)}
          bookId={selectedBookId}
        />
      )}
    </section>
  )
}
