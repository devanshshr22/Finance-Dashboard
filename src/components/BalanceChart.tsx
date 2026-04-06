import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import type { Transaction } from "../types/transaction"

interface Props {
  transactions: Transaction[]
}

function BalanceChart({ transactions }: Props) {

  const sorted = [...transactions].sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  )

  let runningBalance = 0

  const data = sorted.map((t, index) => {

    runningBalance +=
      t.type === "income"
        ? t.amount
        : -t.amount

    return {
      index,
      date: t.date,
      balance: runningBalance,
      category: t.category,
      amount: t.amount,
      type: t.type
    }
  })

  return (

    <div
      className="
      w-full
      h-[320px] sm:h-[380px] lg:h-[450px]
      rounded-xl
      border border-slate-200
      bg-white dark:bg-slate-900
      p-5 sm:p-6
      flex flex-col
      shadow-sm
      transition-all duration-200
      hover:shadow-lg hover:scale-[1.01]
      "
    >

      <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-4">
        Balance Trend
      </h3>

      <ResponsiveContainer width="100%" height="85%">

        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E2E8F0"
            strokeOpacity={0.6}
          />

          {/* Use index so points never overlap */}

          <XAxis dataKey="index" hide />

          <YAxis
            tickFormatter={(v) => `₹${v / 1000}k`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0F172A",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
              fontSize: "13px"
            }}

            labelFormatter={(_label, payload) => {
              const entry = payload?.[0]?.payload
              return `${entry?.date} • ${entry?.category}`
            }}

            formatter={(value, _name, props) => {
              const entry = props.payload

              return [
                `₹${value}`,
                `${entry.type === "income" ? "+" : "-"}₹${entry.amount}`
              ]
            }}
          />

          <Line
            type="monotone"
            dataKey="balance"
            stroke="#0D9488"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default BalanceChart