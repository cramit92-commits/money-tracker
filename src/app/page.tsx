"use client";

import { useEffect, useMemo, useState } from "react";
import Charts from "@/components/Charts";
import SummaryCards from "@/components/SummaryCards";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { loadTransactions, saveTransactions } from "@/services/storage";
import { Transaction, getMonthlySummary } from "@/utils/transactions";

const HomePage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);

  useEffect(() => {
    setTransactions(loadTransactions());
  }, []);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const handleSubmit = (transaction: Transaction) => {
    setTransactions((prev) => {
      const exists = prev.find((item) => item.id === transaction.id);
      if (exists) {
        return prev.map((item) => (item.id === transaction.id ? transaction : item));
      }
      return [transaction, ...prev];
    });
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    if (editing?.id === id) {
      setEditing(null);
    }
  };

  const sortedTransactions = useMemo(
    () =>
      [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [transactions]
  );

  const now = new Date();
  const monthlyTransactions = getMonthlySummary(
    transactions,
    now.getMonth(),
    now.getFullYear()
  );

  return (
    <main className="page">
      <header className="hero">
        <div>
          <span className="pill">Money Tracker</span>
          <h1>Stay on top of your money, every day.</h1>
          <p>
            Add income and expenses, monitor categories, and keep a clear view of your
            monthly progress.
          </p>
        </div>
        <div className="hero-card">
          <h3>Quick tips</h3>
          <ul>
            <li>Use categories to spot spending patterns.</li>
            <li>Edit or delete entries anytime.</li>
            <li>Your data stays in your browser.</li>
          </ul>
        </div>
      </header>

      <SummaryCards transactions={transactions} monthlyTransactions={monthlyTransactions} />

      <section className="grid">
        <TransactionForm
          onSubmit={handleSubmit}
          editing={editing}
          onCancelEdit={() => setEditing(null)}
        />
        <Charts transactions={transactions} />
      </section>

      <TransactionList
        transactions={sortedTransactions}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </main>
  );
};

export default HomePage;
