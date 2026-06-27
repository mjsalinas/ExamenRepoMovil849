import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { store } from "./src/store";

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

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Provider store={store}>
            <ThemedApp />
          </Provider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
