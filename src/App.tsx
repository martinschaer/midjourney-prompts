import { Outlet, Link } from '@tanstack/router'

function App() {
  return (
    <>
      <div className="card card--compact fixed left-0 top-0 w-screen backdrop-blur">
        <div className="container mx-auto flex gap-4 p-2">
          <Link to="/" activeProps={{ className: 'font-bold' }}>
            Midjourney Prompts Generator
          </Link>
          <Link
            to="/about"
            className="ml-auto"
            activeProps={{ className: 'font-bold' }}
          >
            About
          </Link>
        </div>
      </div>
      <div className="pt-8">
      <Outlet />
      </div>
    </>
  )
}

export default App
