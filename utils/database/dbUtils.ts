import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db, Transaction } from "./dbConfig";

export const addTransaction = async (transaction: {
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  account: "cash" | "bank";
}) => {
  db.execSync(
    `INSERT INTO transactions (type, amount, category, description, date, account) VALUES ('${transaction.type}', ${transaction.amount}, '${transaction.category}', '${transaction.description}', '${transaction.date}', '${transaction.account}');`
  );
  console.log("Transaction added successfully");
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["cash-balance"] });
      queryClient.invalidateQueries({ queryKey: ["bank-balance"] });
    },
  });
};

export const fetchTransactions = (): Transaction[] => {
  const results = db.getAllSync<Transaction>(
    `SELECT * FROM transactions ORDER BY date DESC;`
  );
  return results;
};

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
};

export const calculateBalance = (account: "cash" | "bank"): number => {
  const result = db.getFirstSync<{ balance: number }>(
    `SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) AS balance
       FROM transactions
       WHERE account = ?;`,
    [account]
  );
  return result?.balance || 0;
};

export const useCalculateCashBalance = () => {
  return useQuery({
    queryKey: ["cash-balance"],
    queryFn: () => calculateBalance("cash"),
  });
};

export const useCalculateBankBalance = () => {
  return useQuery({
    queryKey: ["bank-balance"],
    queryFn: () => calculateBalance("bank"),
  });
};
