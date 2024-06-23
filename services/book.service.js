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
}

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (gFilterBy.minAmount) {
      books = books.filter((book) => book.maxAmount >= gFilterBy.minAmount)
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
const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
const books = []
for (let i = 0; i < 20; i++) {
const book = {
id: utilService.makeId(),
title: utilService.makeLorem(2),
subtitle: utilService.makeLorem(4),
authors: [
utilService.makeLorem(1)
],
publishedDate: utilService.getRandomIntInclusive(1950, 2024),
description: utilService.makeLorem(20),
pageCount: utilService.getRandomIntInclusive(20, 600),
categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
language: "en",
listPrice: {
amount: utilService.getRandomIntInclusive(80, 500),
currencyCode: "EUR",
isOnSale: Math.random() > 0.7
}
}
books.push(book)
}
utilService.saveToStorage(BOOK_KEY, books)
console.log('books', books)
}

function getDefaultFilter() {
  return { txt: '', minPrice: '' }
}
