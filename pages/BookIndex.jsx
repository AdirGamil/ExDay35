import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from '../pages/BookDetails.jsx'


const { useEffect, useState } = React


export function BookIndex() {
  const [books, setBooks] = useState([])
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())



  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        console.error('Error loading books:', err)
        setBooks(books)
        
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
     <React.Fragment>
      <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <BookList
                        books={books}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
                {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}

    </section>
  )
}