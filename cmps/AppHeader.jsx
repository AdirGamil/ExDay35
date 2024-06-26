const { Link, NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header">
      <section>
        <h1>React Car App</h1>
        <nav className="app-nav">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
    </header>
  )
}
