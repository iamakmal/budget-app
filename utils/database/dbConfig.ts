import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("finance.db");

export type Transaction = {
  id?: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  date: string;
  account: "cash" | "bank";
};

const initDatabase = () => {
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
  console.log("Database and table created successfully");
};

export { db, initDatabase, Transaction };
