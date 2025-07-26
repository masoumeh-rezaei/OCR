'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { BsSun, BsMoon } from 'react-icons/bs'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-xl p-2 rounded-full transition-all duration-300 hover:scale-110"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? <BsSun /> : <BsMoon />}
    </button>
  )
}

export default ThemeToggle
