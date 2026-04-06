import { useEffect, useState } from "react"

function ThemeToggle() {

  const [darkMode, setDarkMode] = useState(false)

  // Load saved theme
  useEffect(() => {

    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    }

  }, [])

  const toggleTheme = () => {

    const root = document.documentElement

    if (darkMode) {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }

    setDarkMode(!darkMode)
  }

  return (

    <button
      onClick={toggleTheme}
      className="
      flex items-center justify-center
      border border-slate-300
      dark:border-slate-600
      bg-white dark:bg-slate-800
      text-slate-700 dark:text-white
      rounded-md
      px-3 py-1.5
      text-sm
      transition-all duration-200
      hover:border-teal-500
      hover:scale-105
      active:scale-95
      "
    >

      {darkMode ? "🌙" : "☀️"}

    </button>

  )
}

export default ThemeToggle