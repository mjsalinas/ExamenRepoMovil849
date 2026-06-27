import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider, useDispatch } from "react-redux";
import { store } from "./src/store";
import { fetchExpenses } from "./src/store/expensesSlice";
import type { AppDispatch } from "./src/store";

import { LanguageProvider } from "./src/context/LanguageContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { RootNavigator } from "./src/navigation/RootNavigator";

function ThemedApp() {
  const { isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <RootNavigator />
    </>
  );
}

function AppLoader() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return <ThemedApp />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Provider store={store}>
            <AppLoader />
          </Provider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
