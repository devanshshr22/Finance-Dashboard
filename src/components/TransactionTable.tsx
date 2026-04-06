import { useState, useMemo } from "react"
import type { Transaction } from "../types/transaction"

interface Props {
  role: string
  transactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

const categories = [
  "Salary","Freelance","Food","Transport","Shopping",
  "Entertainment","Bills","Groceries","Health","Travel","Investment"
]

const today = () => new Date().toISOString().split("T")[0]

export default function TransactionTable({
  role,
  transactions,
  setTransactions
}: Props) {

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")
  const [sort, setSort] = useState<"asc" | "desc">("desc")

  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const [form, setForm] = useState({
    category: "",
    type: "expense" as "income" | "expense",
    amount: "",
    date: today()
  })

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target

    setForm({
      ...form,
      [name]: name === "type"
        ? (value as "income" | "expense")
        : value
    })
  }

  const openAdd = () => {

    setEditing(null)

    setForm({
      category: "",
      type: "expense",
      amount: "",
      date: today()
    })

    setModal(true)
  }

  const openEdit = (t: Transaction) => {

    setEditing(t)

    setForm({
      category: t.category,
      type: t.type,
      amount: String(t.amount),
      date: t.date
    })

    setModal(true)
  }

  const save = () => {

    const amount = Number(form.amount)
    if (!form.category || !amount) return

    const updated = editing
      ? transactions.map(t =>
          t.id === editing.id
            ? { ...t, ...form, amount }
            : t
        )
      : [
          ...transactions,
          {
            id: Date.now(),
            ...form,
            amount
          }
        ]

    setTransactions(updated)

    localStorage.setItem(
      "transactions",
      JSON.stringify(updated)
    )

    setModal(false)
  }

  const data = useMemo(() =>
    transactions
      .filter(t =>
        t.category.toLowerCase().includes(search.toLowerCase()) &&
        (filter === "all" || t.type === filter)
      )
      .sort((a, b) =>
        sort === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
  [transactions, search, filter, sort])

  return (

    <div
      className="
      w-full
      rounded-xl
      border border-slate-200
      bg-white dark:bg-slate-900
      p-6
      shadow-sm
      transition-all duration-200
      hover:shadow-lg hover:scale-[1.01]
      "
    >

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Transactions
        </h2>

        {role === "admin" && (
          <button
            onClick={openAdd}
            className="
            bg-teal-600 hover:bg-teal-700
            text-white
            px-4 py-2
            rounded-md
            text-sm
            transition transform hover:scale-105 active:scale-95
            "
          >
            Add Transaction
          </button>
        )}

      </div>

      {/* Controls */}

      <div className="flex justify-between gap-3 flex-wrap mb-6">

        <input
          placeholder="Search category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="
          border border-slate-300
          px-3 py-2
          rounded-md
          bg-white dark:bg-slate-800
          text-sm
          focus:outline-none focus:ring-2 focus:ring-teal-500
          "
        />

        <div className="flex gap-2">

          <select
            value={filter}
            onChange={e =>
              setFilter(e.target.value as "all" | "income" | "expense")
            }
            className="
            border border-slate-300
            px-3 py-2
            rounded-md
            bg-white dark:bg-slate-800
            text-sm
            focus:outline-none focus:ring-2 focus:ring-teal-500
            "
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button
            onClick={() =>
              setSort(sort === "asc" ? "desc" : "asc")
            }
            className="
            bg-slate-700 hover:bg-slate-800
            text-white
            px-3 py-2
            rounded-md
            text-sm
            "
          >
            {sort === "asc" ? "Oldest" : "Newest"}
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-slate-200 text-slate-600 dark:text-slate-300">

              <th className="py-2 text-left">Date</th>
              <th className="text-left">Category</th>
              <th className="text-left">Type</th>
              <th className="text-left">Amount</th>
              {role === "admin" && <th>Edit</th>}

            </tr>

          </thead>

          <tbody>

            {data.map((t) => (

              <tr
                key={t.id}
                className="
                border-b border-slate-100
                hover:bg-slate-50 dark:hover:bg-slate-800
                transition
                "
              >

                <td className="py-2">{t.date}</td>

                <td>{t.category}</td>

                <td
                  className={
                    t.type === "income"
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {t.type}
                </td>

                <td className="font-medium">
                  ₹{t.amount}
                </td>

                {role === "admin" && (
                  <td>
                    <button
                      onClick={() => openEdit(t)}
                      className="text-teal-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Modal */}

      {modal && (

        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setModal(false)}
          />

          <div className="relative bg-white dark:bg-slate-900 p-6 rounded-xl w-[360px] shadow-xl">

            <h3 className="font-semibold mb-4">
              {editing ? "Edit Transaction" : "Add Transaction"}
            </h3>

            <div className="flex flex-col gap-3">

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={change}
                className="border border-slate-300 px-3 py-2 rounded-md"
              />

              <select
                name="category"
                value={form.category}
                onChange={change}
                className="border border-slate-300 px-3 py-2 rounded-md"
              >
                <option value="">Category</option>
                {categories.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                name="type"
                value={form.type}
                onChange={change}
                className="border border-slate-300 px-3 py-2 rounded-md"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={change}
                className="border border-slate-300 px-3 py-2 rounded-md"
              />

              <div className="flex justify-end gap-2 mt-2">

                <button
                  onClick={() => setModal(false)}
                  className="border border-slate-300 px-3 py-2 rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={save}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md"
                >
                  {editing ? "Update" : "Add"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}