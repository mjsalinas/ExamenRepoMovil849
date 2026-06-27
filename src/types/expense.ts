export type ExpenseCategory =
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "health"
  | "entertainment"
  | "other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export const CATEGORIES: ExpenseCategory[] = [
  "food",
  "transport",
  "shopping",
  "bills",
  "health",
  "entertainment",
  "other",
];

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  food: "restaurant",
  transport: "car",
  shopping: "cart",
  bills: "receipt",
  health: "medkit",
  entertainment: "game-controller",
  other: "ellipsis-horizontal",
};
