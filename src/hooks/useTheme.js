import { useEffect, useState } from 'react'

/**
 * Custom hook for managing theme (light/dark)
 * Stores preference in localStorage and applies to document
 */
export const useTheme = () => {
  const [theme, setTheme] = useState('light')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('trustdrive-theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('trustdrive-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return { theme, toggleTheme }
}
