# Money Tracker

A full-stack (client + local storage) money tracking web app built with Next.js, React, and TypeScript. Track income and expenses, view summaries, and visualize spending with clean, responsive charts.

## Features

- Dashboard homepage with quick tips and summary cards
- Add, edit, and delete income/expense transactions
- Fields: title, amount, date, type, category
- Categories: food, travel, bills, shopping, entertainment, others
- Monthly summary and balance calculations
- Transaction history
- Charts for income vs. expense and category breakdown
- Responsive, mobile-first UI with a clean modern layout
- Local storage persistence (no backend required)

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Local storage for persistence

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Charts.tsx
    SummaryCards.tsx
    TransactionForm.tsx
    TransactionList.tsx
  services/
    storage.ts
  utils/
    transactions.ts
```

## Notes

All data is stored locally in your browser via `localStorage`. Clearing your browser storage will remove saved transactions.
