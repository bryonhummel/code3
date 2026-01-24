import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-gray-100 border-b border-gray-300 sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex space-x-8 py-4'>
          <NavLink
            to="/radiocall"
            className={({ isActive }) =>
              `font-bold text-lg transition-colors ${
                isActive
                  ? 'text-red-700 border-b-2 border-red-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            Radio Call
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `font-bold text-lg transition-colors ${
                isActive
                  ? 'text-red-700 border-b-2 border-red-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            NSAA Reports
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
