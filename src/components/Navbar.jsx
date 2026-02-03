import { NavLink, useSearchParams } from 'react-router-dom'

function Navbar() {
  const [searchParams] = useSearchParams()
  const isBeta = searchParams.get('beta') === 'true'

  // Don't render navbar unless beta parameter is present
  if (!isBeta) {
    return null
  }

  // Preserve beta parameter in navigation links
  const betaParam = '?beta=true'

  return (
    <nav className='bg-gray-100 border-b border-gray-300 no-print'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex space-x-4 py-4'>
          <NavLink
            to={`/radiocall${betaParam}`}
            className={({ isActive }) =>
              `font-bold text-lg transition-colors px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-red-700 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            Radio Call
          </NavLink>
          <NavLink
            to={`/report${betaParam}`}
            className={({ isActive }) =>
              `font-bold text-lg transition-colors px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-red-700 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
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
