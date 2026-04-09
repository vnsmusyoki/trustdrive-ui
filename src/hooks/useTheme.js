import { useEffect, useState } from 'react'

/**
 * Custom hook for reading the current resolved theme (light/dark).
 * AppLayout is the authoritative theme manager — it applies the .dark class to
 * document.documentElement. This hook observes that class so any component that
 * calls useTheme() always reflects the real resolved state.
 *
 * toggleTheme() is provided for components rendered outside AppLayout (e.g. guest pages).
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('trustdrive-theme', newTheme)
  }

  return { theme, toggleTheme }
}
