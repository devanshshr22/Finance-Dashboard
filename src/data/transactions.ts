import type { Transaction } from "../types/transaction"

const defaultTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-04-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: 2,
    date: "2026-04-02",
    amount: 1200,
    category: "Food",
    type: "expense",
  },
  {
    id: 3,
    date: "2026-04-03",
    amount: 800,
    category: "Transport",
    type: "expense",
  },
  {
    id: 4,
    date: "2026-04-04",
    amount: 2000,
    category: "Freelance",
    type: "income",
  },
  {
    id: 5,
    date: "2026-04-05",
    amount: 1500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 6,
    date: "2026-04-06",
    amount: 700,
    category: "Entertainment",
    type: "expense",
  },
  {
    id: 7,
    date: "2026-04-07",
    amount: 3000,
    category: "Bills",
    type: "expense",
  },
  {
    id: 8,
    date: "2026-04-08",
    amount: 1200,
    category: "Groceries",
    type: "expense",
  },
  {
    id: 9,
    date: "2026-04-09",
    amount: 4000,
    category: "Investment",
    type: "income",
  },
  {
    id: 10,
    date: "2026-04-10",
    amount: 900,
    category: "Health",
    type: "expense",
  },
  {
    id: 11,
    date: "2026-04-11",
    amount: 2500,
    category: "Travel",
    type: "expense",
  },
  {
    id: 12,
    date: "2026-04-12",
    amount: 1500,
    category: "Food",
    type: "expense",
  },
  {
    id: 13,
    date: "2026-04-13",
    amount: 2200,
    category: "Freelance",
    type: "income",
  },
  {
    id: 14,
    date: "2026-04-14",
    amount: 1100,
    category: "Transport",
    type: "expense",
  },
  {
    id: 15,
    date: "2026-04-15",
    amount: 1800,
    category: "Shopping",
    type: "expense",
  },
]

export function getTransactions(): Transaction[] {
  const stored = localStorage.getItem("transactions")

  if (stored) {
    return JSON.parse(stored)
  }

  localStorage.setItem("transactions", JSON.stringify(defaultTransactions))
  return defaultTransactions
}

export function saveTransactions(transactions: Transaction[]) {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}


