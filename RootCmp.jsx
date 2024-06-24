const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

const { useState } = React

export function App() {
  const [page, setPage] = useState('home')

  return (
    <section className="app">
      <header className="app-header">
        <h1>My App</h1>
        <nav className="app-nav">
          <a onClick={() => setPage('home')} href="#">
            Home
          </a>
          <a onClick={() => setPage('about')} href="#">
            About
          </a>
          <a onClick={() => setPage('bookidx')} href="#">
            Book Index
          </a>
        </nav>
      </header>

      <main className="container">
        {page === 'home' && <Home />}
        {page === 'about' && <AboutUs />}
        {page === 'bookidx' && <BookIndex />}
      </main>
    </section>
  )
}
