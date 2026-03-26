import { useMode } from '../context/ModeContext'

export default function Header({ currentPage, onNavigate }) {
  const { isInstructor, toggleMode } = useMode()

  const links = [
    { id: 'landing', label: 'Главная' },
    { id: 'about', label: 'О тренажере' },
    { id: 'session', label: 'Сессия' },
    { id: 'map', label: 'Программа' },
    { id: 'pitch', label: 'Презентация' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isInstructor
        ? 'bg-blue-50/80 border-blue-100'
        : 'bg-sky-50/80 border-sky-100'
    }`}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => onNavigate('landing')}
          className="font-display text-lg font-bold text-gray-900 tracking-tight hover:opacity-70 transition-opacity"
        >
          Pre-Prod
        </button>

        <nav className="hidden sm:flex items-center gap-1">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                currentPage === link.id
                  ? 'bg-accent-100 text-accent-700 font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={toggleMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            isInstructor
              ? 'bg-blue-100 text-blue-700'
              : 'bg-sky-100 text-sky-700'
          }`}
        >
          <span className={`transition-opacity ${isInstructor ? 'opacity-40' : 'opacity-100'}`}>👤</span>
          <div className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${
            isInstructor ? 'bg-blue-500' : 'bg-sky-400'
          }`}>
            <div
              className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300"
              style={{ transform: isInstructor ? 'translateX(16px)' : 'translateX(0)' }}
            />
          </div>
          <span className={`transition-opacity ${isInstructor ? 'opacity-100' : 'opacity-40'}`}>🎓</span>
        </button>
      </div>

      <div className="sm:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
              currentPage === link.id
                ? 'bg-accent-100 text-accent-700 font-medium'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  )
}
