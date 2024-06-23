const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'

const bookList =  [
  {
    "id": "OXeMG8wNskc",
    "title": "metus hendrerit",
    "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
    "authors": [
      "Barbara Cartland"
    ],
    "publishedDate": 1999,
    "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
    "pageCount": 713,
    "categories": [
      "Computers",
      "Hack"
    ],
    "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
    "language": "en",
    "listPrice": {
      "amount": 109,
      "currencyCode": "EUR",
      "isOnSale": false
    }
  },
  {
    "id": "JYOJa2NpSCq",
    "title": "morbi",
    "subtitle": "lorem euismod dictumst inceptos mi",
    "authors": [
      "Barbara Cartland"
    ],
    "publishedDate": 1978,
    "description": "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
    "pageCount": 129,
    "categories": [
      "Computers",
      "Hack"
    ],
    "thumbnail": "http://coding-academy.org/books-photos/14.jpg",
    "language": "sp",
    "listPrice": {
      "amount": 44,
      "currencyCode": "EUR",
      "isOnSale": true
    }
  },
  {
    "id": "1y0Oqts35DQ",
    "title": "at viverra venenatis",
    "subtitle": "gravida libero facilisis rhoncus urna etiam",
    "authors": [
      "Dr. Seuss"
    ],
    "publishedDate": 1999,
    "description": "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
    "pageCount": 972,
    "categories": [
      "Computers",
      "Hack"
    ],
    "thumbnail": "http://coding-academy.org/books-photos/2.jpg",
    "language": "he",
    "listPrice": {
      "amount": 108,
      "currencyCode": "ILS",
      "isOnSale": false
    }
  },
]

export function BookIndex() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService.query()
      .then((books) => setBooks(books))
      .catch((err) => {
        console.error('Error loading books:', err)
        setBooks(bookList)
        
      })
  }

  return (
    <section className="books-list">
      {books.length === 0 ? (
        <p>Loading books...</p>
      ) : (
        bookList.map(book => (
          <div key={book.id}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <img src={book.thumbnail} alt={book.title} />
            <p>
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </p>
          </div>
        ))
      )}
    </section>
  )
}