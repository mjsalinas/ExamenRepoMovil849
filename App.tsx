import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LanguageProvider } from "./src/context/LanguageContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { Provider } from "react-redux";
import { store, useAppDispatch } from "./src/store/store";
import { loadExpenses, saveExpenses } from "./src/storage/storage";
import { setExpenses, setLoading } from "./src/store/expensesSlice";

function ThemedApp() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadExpenses().then((stored) => {
      dispatch(setExpenses(stored));
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      void saveExpenses(state.expenses.expenses);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <ThemedApp />
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}