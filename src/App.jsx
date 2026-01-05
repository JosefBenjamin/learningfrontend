import { NavLink, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <header>
      <div>
        Learn Datamatiker.Dev
      </div>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/courses">Courses</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
    </header>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>

    <footer>
      <div>
      <p>© 2026 Datamatiker.Dev</p>
      </div>
    </footer>

    </>
  )
}

export default App
