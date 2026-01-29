import { Transaction, getBalance, getTotals } from "@/utils/transactions";

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

type Props = {
  transactions: Transaction[];
  monthlyTransactions: Transaction[];
};

const SummaryCards = ({ transactions, monthlyTransactions }: Props) => {
  const balance = getBalance(transactions);
  const totals = getTotals(transactions);
  const monthlyTotals = getTotals(monthlyTransactions);

  return (
    <div className="summary-grid">
      <div className="card highlight">
        <h3>Total balance</h3>
        <strong>{formatCurrency(balance)}</strong>
        <p>All-time balance across every transaction.</p>
      </div>
      <div className="card">
        <h3>Total income</h3>
        <strong>{formatCurrency(totals.income)}</strong>
        <p>All income received so far.</p>
      </div>
      <div className="card">
        <h3>Total expenses</h3>
        <strong>{formatCurrency(totals.expense)}</strong>
        <p>All expenses recorded so far.</p>
      </div>
      <div className="card">
        <h3>This month</h3>
        <strong>
          {formatCurrency(monthlyTotals.income - monthlyTotals.expense)}
        </strong>
        <p>
          Income {formatCurrency(monthlyTotals.income)} · Expenses {formatCurrency(monthlyTotals.expense)}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;
