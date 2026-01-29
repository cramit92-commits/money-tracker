import { Transaction, categoryOptions, getCategoryTotals, getTotals } from "@/utils/transactions";

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

type Props = {
  transactions: Transaction[];
};

const Charts = ({ transactions }: Props) => {
  const totals = getTotals(transactions);
  const categoryTotals = getCategoryTotals(
    transactions.filter((tx) => tx.type === "expense")
  );
  const totalExpenses = totals.expense || 1;
  const totalFlow = totals.income + totals.expense || 1;
  const incomePercent = Math.round((totals.income / totalFlow) * 100);

  return (
    <div className="chart-grid">
      <div className="card">
        <h2>Income vs expense</h2>
        <div className="progress">
          <span style={{ width: `${incomePercent}%` }} />
        </div>
        <div className="chart-meta">
          <div>
            <p>Income</p>
            <strong>{formatCurrency(totals.income)}</strong>
          </div>
          <div>
            <p>Expenses</p>
            <strong>{formatCurrency(totals.expense)}</strong>
          </div>
          <div>
            <p>Income %</p>
            <strong>{incomePercent}%</strong>
          </div>
        </div>
      </div>
      <div className="card">
        <h2>Category breakdown</h2>
        <div className="category-chart">
          {categoryOptions.map((category) => {
            const value = categoryTotals[category];
            const percent = Math.round((value / totalExpenses) * 100);
            return (
              <div key={category} className="category-row">
                <span className="category-label">{category}</span>
                <div className="category-bar">
                  <span style={{ width: `${percent}%` }} />
                </div>
                <span className="category-value">
                  {formatCurrency(value)} ({percent}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Charts;
