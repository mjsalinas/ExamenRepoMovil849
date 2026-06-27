import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Expense } from "../types/expense";

type NewExpensePayload = Omit<Expense, "id" | "date">;

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
}

const initialState: ExpensesState = {
  expenses: [],
  loading: true,
};

// Función idéntica a la del Context original para generar IDs únicos
function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addExpense: (state, action: PayloadAction<NewExpensePayload>) => {
      const expense: Expense = {
        ...action.payload,
        id: createId(),
        date: new Date().toISOString(),
      };
      state.expenses.unshift(expense); // Agrega al inicio para mantener el orden original
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((item) => item.id !== action.payload);
    },
    clearExpenses: (state) => {
      state.expenses = [];
    },
  },
});

export const {
  setExpenses,
  setLoading,
  addExpense,
  removeExpense,
  clearExpenses,
} = expensesSlice.actions;

export default expensesSlice.reducer;