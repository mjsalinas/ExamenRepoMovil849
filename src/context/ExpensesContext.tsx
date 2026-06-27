import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loadExpenses, saveExpenses } from "../storage/storage";
import type { Expense } from "../types/expense";

type NewExpense = Omit<Expense, "id" | "date">;

interface ExpensesContextValue {
  expenses: Expense[];
  loading: boolean;
  total: number;
  addExpense: (data: NewExpense) => void;
  removeExpense: (id: string) => void;
  clearExpenses: () => void;
}

const ExpensesContext = createContext<ExpensesContextValue | undefined>(
  undefined
);

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses().then((stored) => {
      setExpenses(stored);
      setLoading(false);
    });
  }, []);

  const persist = (next: Expense[]) => {
    setExpenses(next);
    void saveExpenses(next);
  };

  const addExpense = (data: NewExpense) => {
    const expense: Expense = {
      ...data,
      id: createId(),
      date: new Date().toISOString(),
    };
    persist([expense, ...expenses]);
  };

  const removeExpense = (id: string) => {
    persist(expenses.filter((item) => item.id !== id));
  };

  const clearExpenses = () => persist([]);

  const total = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amount, 0),
    [expenses]
  );

  const value = useMemo<ExpensesContextValue>(
    () => ({
      expenses,
      loading,
      total,
      addExpense,
      removeExpense,
      clearExpenses,
    }),
    [expenses, loading, total]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses(): ExpensesContextValue {
  const ctx = useContext(ExpensesContext);
  if (!ctx)
    throw new Error("useExpenses debe usarse dentro de ExpensesProvider");
  return ctx;
}
