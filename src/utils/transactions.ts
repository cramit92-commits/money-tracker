export type TransactionType = "income" | "expense";

export type Category =
  | "food"
  | "travel"
  | "bills"
  | "shopping"
  | "entertainment"
  | "others";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: Category;
};

export const categoryOptions: Category[] = [
  "food",
  "travel",
  "bills",
  "shopping",
  "entertainment",
  "others"
];

export const getBalance = (transactions: Transaction[]) =>
  transactions.reduce((total, tx) =>
    tx.type === "income" ? total + tx.amount : total - tx.amount,
  0);

export const getTotals = (transactions: Transaction[]) =>
  transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") {
        acc.income += tx.amount;
      } else {
        acc.expense += tx.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

export const getMonthlySummary = (transactions: Transaction[], month: number, year: number) =>
  transactions.filter((tx) => {
    const date = new Date(tx.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

export const getCategoryTotals = (transactions: Transaction[]) =>
  transactions.reduce<Record<Category, number>>(
    (acc, tx) => {
      acc[tx.category] += tx.amount;
      return acc;
    },
    {
      food: 0,
      travel: 0,
      bills: 0,
      shopping: 0,
      entertainment: 0,
      others: 0
    }
  );
