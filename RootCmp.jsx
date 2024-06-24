const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate, Link, NavLink } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookIndex } from './pages/BookIndex.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { AddReview } from './cmps/AddReview.jsx'

// const { useState } = React
export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />

        <main className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/books" element={<BookIndex />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/books/review/:bookId" element={<AddReview />} />
            <Route path="/books/edit" element={<BookEdit />} />
            <Route path="/books/edit/:bookId" element={<BookEdit />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
