import { useNavigate, useLocation } from 'react-router-dom'
import { Home, MapPin, Bell, MoreHorizontal } from 'lucide-react'

const BottomNavigation = ({ currentPage }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {
      id: 'home',
      label: 'Início',
      icon: Home,
      path: '/home'
    },
    {
      id: 'track',
      label: 'Track',
      icon: MapPin,
      path: '/track'
    },
    {
      id: 'alert',
      label: 'Alerta',
      icon: Bell,
      path: '/alert'
    },
    {
      id: 'more',
      label: 'Mais',
      icon: MoreHorizontal,
      path: '/more'
    }
  ]

  const isActive = (path) => {
    return location.pathname === path || currentPage === path.replace('/', '')
  }

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                active 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${active ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation

