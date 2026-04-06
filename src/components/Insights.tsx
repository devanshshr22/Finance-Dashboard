import type { Transaction } from "../types/transaction"

interface Props {
  transactions: Transaction[]
}

function Insights({ transactions }: Props) {

  const expenses = transactions.filter(t => t.type === "expense")

  /* Highest Spending Category */

  const categoryMap: Record<string, number> = {}

  expenses.forEach(t => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount
  })

  const highestCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0]

  /* Monthly Comparison */

  const currentMonth = new Date().getMonth()
  const lastMonth = currentMonth - 1

  const thisMonthExpense = expenses
    .filter(t => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0)

  const lastMonthExpense = expenses
    .filter(t => new Date(t.date).getMonth() === lastMonth)
    .reduce((sum, t) => sum + t.amount, 0)

  const difference = thisMonthExpense - lastMonthExpense

  let observation = ""

  if (difference > 0) {
    observation = "Spending increased compared to last month"
  } else if (difference < 0) {
    observation = "Spending decreased compared to last month"
  } else {
    observation = "Spending remained stable"
  }

  return (

    <div
      className="
      rounded-xl
      border border-slate-200
      bg-white dark:bg-slate-900
      p-4
      shadow-sm
      transition-all duration-200
      hover:shadow-lg hover:scale-[1.01]
      h-fit
      "
    >

      <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
        Insights
      </h2>

      <div className="space-y-2">

        {/* Highest Spending */}

        <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-800">

          <p className="text-xs text-slate-500">
            Highest Spending
          </p>

          <p className="text-sm font-semibold text-slate-800 dark:text-white">

            {highestCategory
              ? `${highestCategory[0]} — ₹${highestCategory[1]}`
              : "No expenses yet"}

          </p>

        </div>


        {/* Monthly Comparison */}

        <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-800">

          <p className="text-xs text-slate-500">
            Monthly Comparison
          </p>

          <p className="text-sm font-semibold text-slate-800 dark:text-white">

            ₹{thisMonthExpense} vs ₹{lastMonthExpense}

          </p>

        </div>


        {/* Observation */}

        <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-800">

          <p className="text-xs text-slate-500">
            Observation
          </p>

          <p className="text-sm text-slate-700 dark:text-slate-200">

            {observation}

          </p>

        </div>

      </div>

    </div>

  )
}

export default Insights