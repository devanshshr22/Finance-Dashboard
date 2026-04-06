import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"

import type { Transaction } from "../types/transaction"

interface Props {
  transactions: Transaction[]
}

function CategoryChart({ transactions }: Props) {

  const expenses = transactions.filter(
    (t) => t.type === "expense"
  )

  const categoryMap: Record<string, number> = {}

  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount
  })

  const data = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat]
  }))

  const colors = [
    "#0D9488",
    "#14B8A6",
    "#2DD4BF",
    "#5EEAD4",
    "#99F6E4"
  ]

  return (

    <div
      className="
      w-full
      min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]
      rounded-xl
      border border-slate-200
      bg-white dark:bg-slate-900
      p-4 sm:p-6
      flex flex-col
      shadow-sm
      transition-all duration-200
      hover:shadow-lg hover:scale-[1.01]
      "
    >

      <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-2">
        Spending Breakdown
      </h3>

      {/* Chart */}

      <div className="flex-1 min-h-[200px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              innerRadius={40}
              paddingAngle={3}
            >

              {data.map((_, index) => (
                <Cell
                  key={`slice-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}

            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
                fontSize: "13px"
              }}
              formatter={(value, _name, props) => {
                const category = props.payload.name
                return [`₹${value}`, category]
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Custom Legend */}

      <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs">

        {data.map((entry, index) => (

          <div key={index} className="flex items-center gap-1">

            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: colors[index % colors.length]
              }}
            />

            <span className="text-slate-600 dark:text-slate-300">
              {entry.name}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default CategoryChart