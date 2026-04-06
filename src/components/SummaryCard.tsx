interface Props {
  title: string
  amount: number
}

function SummaryCard({ title, amount }: Props) {
  return (
    <div
      className="
      w-full
      p-5 sm:p-6 lg:p-7
      rounded-xl
      border border-slate-200
      bg-white dark:bg-slate-900
      shadow-sm
      hover:shadow-lg
      transition-all duration-200 ease-in-out
      hover:scale-[1.02]
      flex flex-col justify-center
      min-h-[110px] sm:min-h-[140px] lg:min-h-[170px]
      "
    >

      {/* Title */}

      <p className="text-xs sm:text-sm lg:text-base text-slate-500 dark:text-slate-400">
        {title}
      </p>

      {/* Amount */}

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mt-2 text-slate-900 dark:text-white tracking-tight">
        ₹{amount.toLocaleString()}
      </h2>

    </div>
  )
}

export default SummaryCard