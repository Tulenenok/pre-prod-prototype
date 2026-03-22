import { createContext, useContext, useState } from 'react'

const ModeContext = createContext()

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('user')

  const toggleMode = () => setMode(m => m === 'user' ? 'instructor' : 'user')
  const isInstructor = mode === 'instructor'

  return (
    <ModeContext.Provider value={{ mode, isInstructor, toggleMode }}>
      <div className={isInstructor ? 'mode-instructor' : ''}>
        {children}
      </div>
    </ModeContext.Provider>
  )
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within ModeProvider')
  return ctx
}
