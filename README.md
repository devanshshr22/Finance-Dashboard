# Finance Dashboard
A responsive Finance Dashboard built using **React, TypeScript, TailwindCSS, and Recharts**.
The application allows users to track financial activity, visualize spending patterns, and manage transactions through a clean and interactive dashboard interface.

---

# Features

## Dashboard Overview
- Summary cards displaying **Total Balance, Total Income, and Total Expenses**
- **Balance Trend Line Chart** showing balance changes over time
- **Spending Breakdown Pie Chart** showing category-wise expenses

## Transactions Management
- View all transactions in a structured table
- Search transactions by category
- Filter transactions by **Income / Expense**
- Sort transactions by **date**
- **Add new transactions**
- **Edit existing transactions**

## Role Based UI
Two roles are simulated in the UI:

### Viewer
- Can view dashboard data
- Cannot modify transactions

### Admin
- Can add new transactions
- Can edit existing transactions
- Changes automatically update the dashboard

## Insights Section
The dashboard generates useful financial insights including:

- Highest spending category
- Monthly spending comparison
- Observational spending insight

## Data Persistence
Transactions are stored using **LocalStorage**, meaning:
- Added transactions persist after refresh
- Edited transactions update instantly
- Dashboard automatically recalculates charts and totals

## UI / UX
- Clean **FinTech-style minimal design**
- **Fully responsive layout**
- Works on **desktop, tablet, and mobile**
- **Dark mode / Light mode toggle**
- Interactive charts with tooltips
- Smooth hover animations on dashboard components

---

# Tech Stack

### Frontend
React  
TypeScript  
Vite  

### Styling
TailwindCSS  

### Charts
Recharts  

### State Management
React Hooks  

### Storage
LocalStorage  

---

# Installation
Clone the repository:

git clone https://github.com/devanshshr22/Finance-Dashboard.git

Navigate into the project directory:

cd finance-dashboard

Install dependencies:

npm install

Start the development server:

npm run dev

Open the application in your browser:

http://localhost:5173

---

# Project Structure

finance-dashboard

src
- components
  - Navbar.tsx
  - SummaryCard.tsx
  - BalanceChart.tsx
  - CategoryChart.tsx
  - TransactionTable.tsx
  - Insights.tsx

- data
  - transactions.ts

- types
  - transaction.ts

- App.tsx
- main.tsx

public

package.json  
vite.config.ts  
README.md  

---

# Future Improvements
Potential improvements for future versions:

- Backend integration with a database
- User authentication system
- Export transactions as CSV or JSON
- Advanced financial analytics
- Budget planning tools
- Multi-user support

---

# Author

Devansh Shrivastava

---

# License

This project is created for educational and evaluation purposes.

