const { useState } = React

import { bookService } from '../services/book.service.js'

export function BookAdd() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  function handleSearchChange(event) {
    const term = event.target.value
    setSearchTerm(term)

    if (term.trim() === '') {
      setSearchResults([])
      return
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.items || [])
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setSearchResults([])
      })
  }

  function handleAddBook(googleBook) {
    bookService
      .addGoogleBook(googleBook)
      .then(() => {
        console.log('Book added successfully:', googleBook)
      })
      .catch((error) => {
        console.error('Error adding book:', error)
      })
  }

  return (
    <div className="book-add">
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            {book.volumeInfo.title}
            <button onClick={() => handleAddBook(book)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
