import { useState, useEffect } from "react"

import BalanceChart from "./components/BalanceChart"
import CategoryChart from "./components/CategoryChart"
import Navbar from "./components/Navbar"
import SummaryCard from "./components/SummaryCard"
import TransactionTable from "./components/TransactionTable"
import Insights from "./components/Insights"

import { getTransactions, saveTransactions } from "./data/transactions"

function App() {

  const [transactions, setTransactions] =
    useState(() => getTransactions())

  const [role, setRole] =
    useState(() => localStorage.getItem("role") || "viewer")

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  return (

    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-800 dark:bg-slate-800 dark:text-white transition-colors duration-300">

      {/* Navbar */}
      <Navbar role={role} setRole={setRole} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

        {/* Summary Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <SummaryCard
            title="Total Balance"
            amount={balance}
          />

          <SummaryCard
            title="Total Income"
            amount={income}
          />

          <SummaryCard
            title="Total Expenses"
            amount={expenses}
          />

        </div>


        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <BalanceChart transactions={transactions} />

          <CategoryChart transactions={transactions} />

        </div>


        {/* Transactions + Insights */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">

            <TransactionTable
              role={role}
              transactions={transactions}
              setTransactions={setTransactions}
            />

          </div>

          <Insights transactions={transactions} />

        </div>

      </div>

    </div>
  )
}

export default App