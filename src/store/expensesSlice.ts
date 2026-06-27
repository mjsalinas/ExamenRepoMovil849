import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loadExpenses } from '../storage/storage';
import type { Expense } from '../types/expense';

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  total: number;
}

const initialState: ExpensesState = {
  expenses: [],
  loading: true,
  total: 0,
};

function calculateTotal(expenses: Expense[]) {
  return expenses.reduce((sum, item) => sum + item.amount, 0);
}

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => {
    return await loadExpenses();
  }
);

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpenseLocally: (state, action: PayloadAction<Expense>) => {
      state.expenses.unshift(action.payload);
      state.total = calculateTotal(state.expenses);
    },
    removeExpenseLocally: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(e => e.id !== action.payload);
      state.total = calculateTotal(state.expenses);
    },
    clearExpensesLocally: (state) => {
      state.expenses = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses = action.payload;
      state.total = calculateTotal(action.payload);
      state.loading = false;
    });
  }
});

const { addExpenseLocally, removeExpenseLocally, clearExpensesLocally } = expensesSlice.actions;

export const addExpense = (data: Omit<Expense, 'id' | 'date'>) => (dispatch: any) => {
  const expense: Expense = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    date: new Date().toISOString(),
  };
  dispatch(addExpenseLocally(expense));
};

export const removeExpense = (id: string) => (dispatch: any) => {
  dispatch(removeExpenseLocally(id));
};

export const clearExpenses = () => (dispatch: any) => {
  dispatch(clearExpensesLocally());
};

export default expensesSlice.reducer;
