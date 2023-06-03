import { Outlet, Link } from '@tanstack/router'

function App() {
  return (
    <>
      <div className="border-b border-gray-700">
        <div className="container mx-auto flex gap-4 p-2">
          <Link to="/" activeProps={{ className: 'font-bold' }}>
            Midjourney Prompts Generator
          </Link>
          <Link to="/about" activeProps={{ className: 'font-bold' }}>
            About
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default App
