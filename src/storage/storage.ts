import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Language } from "../i18n/translations";
import type { ThemeMode } from "../theme/themes";
import type { Expense } from "../types/expense";

const KEYS = {
  expenses: "@gastos/expenses",
  theme: "@gastos/theme",
  language: "@gastos/language",
} as const;

export async function loadExpenses(): Promise<Expense[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.expenses);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Expense[]) : [];
  } catch {
    return [];
  }
}

export async function saveExpenses(expenses: Expense[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.expenses, JSON.stringify(expenses));
  } catch {
    // Silenciar: no bloquear la UI por un fallo de escritura.
  }
}

export async function loadTheme(): Promise<ThemeMode | null> {
  const value = await AsyncStorage.getItem(KEYS.theme);
  return value === "light" || value === "dark" ? value : null;
}

export async function saveTheme(mode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(KEYS.theme, mode);
}

export async function loadLanguage(): Promise<Language | null> {
  const value = await AsyncStorage.getItem(KEYS.language);
  return value === "es" || value === "en" ? value : null;
}

export async function saveLanguage(language: Language): Promise<void> {
  await AsyncStorage.setItem(KEYS.language, language);
}
