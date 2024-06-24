import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minAmount: 0 }
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getFilterBy,
  setFilterBy,
  getDefaultFilter,
  getEmptyReview,
  addReview,
  getReviews,
  deleteReview,
}

function query(filter) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filter.txt) {
      const regex = new RegExp(filter.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (filter.price) {
      books = books.filter((book) => book.listPrice.amount >= filter.price)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', maxAmount = 0) {
  return { id: '', title, maxAmount }
}

function getEmptyReview(name = '', rating = 0) {
  return { name, rating }
}

function getReviews(bookId) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    return book.reviews || []
  })
}

function addReview(bookId, review) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    if (!book.reviews) {
      book.reviews = []
    }
    review.id = utilService.makeId()
    book.reviews.push(review)
    return storageService.put(BOOK_KEY, book)
  })
}

function deleteReview(bookId, reviewId) {
  return storageService.get(BOOK_KEY, bookId).then((book) => {
    if (!book.reviews) {
      return
    }
    book.reviews = book.reviews.filter((review) => review.id !== reviewId)
    return storageService.put(BOOK_KEY, book)
  })
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minAmount !== undefined) gFilterBy.minAmount = filterBy.minAmount
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

function _createBooks() {
  if (utilService.loadFromStorage(BOOK_KEY)) {
    console.log('Books already exist in storage')
    return
  }

  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  let books = []
  for (let i = 0; i < 20; i++) {
    const book = {
      idx: i,
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    }
    books.push(book)
  }

  utilService.saveToStorage(BOOK_KEY, books)
  console.log('Initial books created and saved to storage:', books)
}

function getDefaultFilter() {
  return { txt: '', minPrice: '' }
}
