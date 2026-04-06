interface Props {
  role: string
  setRole: React.Dispatch<React.SetStateAction<string>>
}

function RoleSwitcher({ role, setRole }: Props) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const newRole = e.target.value

    setRole(newRole)

    localStorage.setItem("role", newRole)
  }

  return (

    <select
      value={role}
      onChange={handleChange}
      className="
      border border-slate-300
      rounded-md
      px-3 py-1.5
      text-sm
      bg-white text-slate-700
      dark:bg-slate-800 dark:text-white dark:border-slate-600
      transition-all duration-200
      hover:border-teal-500
      focus:outline-none focus:ring-2 focus:ring-teal-500
      "
    >

      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>

    </select>

  )
}

export default RoleSwitcher