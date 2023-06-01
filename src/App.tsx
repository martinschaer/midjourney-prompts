import { Outlet, Link } from '@tanstack/router'

function App() {
  return (
    <>
      <div className="border-b">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet />
    </>
  )
}

export default App
