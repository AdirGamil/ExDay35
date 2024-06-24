const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate, Link, NavLink } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'

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
          </Routes>
        </main>
      </section>
    </Router>
  )
}
