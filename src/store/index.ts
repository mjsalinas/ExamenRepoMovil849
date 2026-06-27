import { configureStore, Middleware } from '@reduxjs/toolkit';
import { saveExpenses } from '../storage/storage';
import expensesReducer from './expensesSlice';

const persistenceMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState() as ReturnType<typeof store.getState>;

  if (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as { type: string }).type === 'string' &&
    (action as { type: string }).type.startsWith('expenses/')
  ) {
    void saveExpenses(state.expenses.expenses);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
