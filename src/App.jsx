import { useState } from 'react'
import { ModeProvider } from './context/ModeContext'
import Header from './components/Header'
import Landing from './components/Landing'
import About from './components/About'
import SessionPlayer from './components/SessionPlayer'
import ProgramMap from './components/ProgramMap'
import PitchDeck from './components/PitchDeck'

function Router() {
  const [screen, setScreen] = useState('landing')

  const navigate = (target) => {
    setScreen(target)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const showHeader = screen !== 'session'

  return (
    <>
      {showHeader && <Header currentPage={screen} onNavigate={navigate} />}
      <div className={showHeader ? 'pt-14 sm:pt-14' : ''}>
        {screen === 'landing' && <Landing onNavigate={navigate} />}
        {screen === 'about' && <About onNavigate={navigate} />}
        {screen === 'session' && <SessionPlayer onNavigate={navigate} />}
        {screen === 'map' && <ProgramMap onNavigate={navigate} />}
        {screen === 'pitch' && <PitchDeck />}
      </div>
    </>
  )
}

export default function App() {
  return (
    <ModeProvider>
      <Router />
    </ModeProvider>
  )
}
