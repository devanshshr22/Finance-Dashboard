import ThemeToggle from "./ThemeToggle"

interface Props {
  role: string
  setRole: React.Dispatch<React.SetStateAction<string>>
}

function Navbar({ role, setRole }: Props) {

  const changeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const newRole = e.target.value

    setRole(newRole)

    localStorage.setItem("role", newRole)
  }

  return (

    <div
      className="
      flex justify-between items-center
      px-6 py-4
      bg-white dark:bg-slate-900
      border-b border-slate-200
      sticky top-0 z-50
      transition-all duration-200
      "
    >

      {/* App Name */}

      <h1 className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight">
        Finance Dashboard
      </h1>


      {/* Controls */}

      <div className="flex flex-wrap gap-3 justify-between items-center">

        {/* Role Switcher */}

        <select
          value={role}
          onChange={changeRole}
          className="
          border border-slate-300
          bg-white dark:bg-slate-800
          text-slate-700 dark:text-white
          px-3 py-2
          rounded-md
          text-sm
          transition
          hover:border-teal-500
          focus:outline-none focus:ring-2 focus:ring-teal-500
          "
        >

          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>

        </select>


        {/* Theme Toggle */}

        <div className="transition transform hover:scale-110">
          <ThemeToggle />
        </div>

      </div>

    </div>
  )
}

export default Navbar
