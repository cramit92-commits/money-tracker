"use client";

import { FormEvent, useEffect, useState } from "react";
import { Category, Transaction, TransactionType, categoryOptions } from "@/utils/transactions";

const todayISO = () => new Date().toISOString().slice(0, 10);

type Props = {
  onSubmit: (transaction: Transaction) => void;
  editing?: Transaction | null;
  onCancelEdit?: () => void;
};

const defaultFormState = {
  title: "",
  amount: "",
  date: todayISO(),
  type: "expense" as TransactionType,
  category: "food" as Category
};

const TransactionForm = ({ onSubmit, editing, onCancelEdit }: Props) => {
  const [form, setForm] = useState(defaultFormState);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        amount: editing.amount.toString(),
        date: editing.date,
        type: editing.type,
        category: editing.category
      });
    } else {
      setForm(defaultFormState);
    }
  }, [editing]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!form.title.trim() || Number.isNaN(amount) || amount <= 0) {
      return;
    }

    const transaction: Transaction = {
      id: editing?.id ?? crypto.randomUUID(),
      title: form.title.trim(),
      amount,
      date: form.date,
      type: form.type,
      category: form.category
    };
    onSubmit(transaction);
    if (!editing) {
      setForm(defaultFormState);
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <h2>{editing ? "Edit transaction" : "Add transaction"}</h2>
          <p>Track every income and expense with ease.</p>
        </div>
        {editing && (
          <button type="button" className="button ghost" onClick={onCancelEdit}>
            Cancel edit
          </button>
        )}
      </div>

      <div className="form-grid">
        <label>
          Title
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="Salary, groceries, rent..."
            required
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={(event) => setForm({ ...form, amount: event.target.value })}
            placeholder="0.00"
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
            required
          />
        </label>

        <label>
          Type
          <select
            value={form.type}
            onChange={(event) =>
              setForm({ ...form, type: event.target.value as TransactionType })
            }
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category
          <select
            value={form.category}
            onChange={(event) =>
              setForm({ ...form, category: event.target.value as Category })
            }
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="submit" className="button primary">
        {editing ? "Save changes" : "Add transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
