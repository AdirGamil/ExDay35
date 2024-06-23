import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'


const { useEffect, useState } = React


export function BookIndex() {
  const [books, setBooks] = useState([])
  const [selectedBookId, setSelectedBookId] = useState(null)


  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService.query()
      .then((books) => setBooks(books))
      .catch((err) => {
        console.error('Error loading books:', err)
        setBooks(books)
        
      })
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
}

  if (!books) return <div>Loading...</div>
  return (
    <section className="books-index">
     <React.Fragment>
                    <BookList
                        books={books}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
                {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}

    </section>
  )
}