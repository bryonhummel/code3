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
    <nav className='bg-gray-100 border-b border-gray-300 sticky top-0 z-40 no-print'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex space-x-8 py-4'>
          <NavLink
            to={`/radiocall${betaParam}`}
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
            to={`/report${betaParam}`}
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
