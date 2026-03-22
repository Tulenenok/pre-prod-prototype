import { useState } from 'react'
import Landing from './components/Landing'
import SessionPlayer from './components/SessionPlayer'
import ProgramMap from './components/ProgramMap'

export default function App() {
  const [screen, setScreen] = useState('landing')

  const navigate = (target) => {
    setScreen(target)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  switch (screen) {
    case 'session':
      return <SessionPlayer onNavigate={navigate} />
    case 'map':
      return <ProgramMap onNavigate={navigate} />
    default:
      return <Landing onNavigate={navigate} />
  }
}
