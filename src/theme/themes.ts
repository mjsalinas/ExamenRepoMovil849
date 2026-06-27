export type ThemeMode = "light" | "dark";

export interface AppTheme {
  mode: ThemeMode;
  background: string;
  surface: string;
  card: string;
  primary: string;
  primaryText: string;
  text: string;
  textSecondary: string;
  border: string;
  danger: string;
  success: string;
  tabBar: string;
  tabBarInactive: string;
}

export const lightTheme: AppTheme = {
  mode: "light",
  background: "#f4f5f7",
  surface: "#ffffff",
  card: "#ffffff",
  primary: "#2f6df6",
  primaryText: "#ffffff",
  text: "#11181c",
  textSecondary: "#687076",
  border: "#e3e6ea",
  danger: "#e5484d",
  success: "#2eaa66",
  tabBar: "#ffffff",
  tabBarInactive: "#9ba1a6",
};

export const darkTheme: AppTheme = {
  mode: "dark",
  background: "#0f1115",
  surface: "#171a21",
  card: "#1c2027",
  primary: "#4f86ff",
  primaryText: "#ffffff",
  text: "#ecedee",
  textSecondary: "#9ba1a6",
  border: "#2a2f37",
  danger: "#ff6369",
  success: "#46c483",
  tabBar: "#171a21",
  tabBarInactive: "#6b7178",
};

export const getTheme = (mode: ThemeMode): AppTheme =>
  mode === "dark" ? darkTheme : lightTheme;
