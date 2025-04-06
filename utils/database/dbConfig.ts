import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("finance.db");

export type Transaction = {
  id?: number;
  type: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  account: string;
};

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      account TEXT NOT NULL
    );
  `);

  console.log("Database and tables created successfully");
};
