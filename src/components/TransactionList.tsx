"use client";

import { Transaction } from "@/utils/transactions";

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

type Props = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
};

const TransactionList = ({ transactions, onEdit, onDelete }: Props) => {
  if (!transactions.length) {
    return (
      <div className="card empty-state">
        <h3>No transactions yet</h3>
        <p>Add your first income or expense to get started.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Transaction history</h2>
      <div className="transaction-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-row">
            <div>
              <h4>{tx.title}</h4>
              <p>
                {tx.category} · {new Date(tx.date).toLocaleDateString()}
              </p>
            </div>
            <div className="transaction-meta">
              <span className={tx.type === "income" ? "tag income" : "tag expense"}>
                {tx.type}
              </span>
              <strong>{formatCurrency(tx.amount)}</strong>
              <div className="transaction-actions">
                <button className="button ghost" onClick={() => onEdit(tx)}>
                  Edit
                </button>
                <button className="button ghost danger" onClick={() => onDelete(tx.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
