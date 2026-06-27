import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { AddExpenseScreen } from "../screens/AddExpenseScreen";
import { ExpensesScreen } from "../screens/ExpensesScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { SummaryScreen } from "../screens/SummaryScreen";
import type { TabsParamList } from "./types";

const Tab = createBottomTabNavigator<TabsParamList>();

const ICONS: Record<keyof TabsParamList, keyof typeof Ionicons.glyphMap> = {
  ExpensesTab: "list",
  AddTab: "add-circle",
  SummaryTab: "pie-chart",
  SettingsTab: "settings",
};

export function TabsNavigator() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen
        name="ExpensesTab"
        component={ExpensesScreen}
        options={{ title: t("tabs.expenses") }}
      />
      <Tab.Screen
        name="AddTab"
        component={AddExpenseScreen}
        options={{ title: t("tabs.add") }}
      />
      <Tab.Screen
        name="SummaryTab"
        component={SummaryScreen}
        options={{ title: t("tabs.summary") }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ title: t("tabs.settings") }}
      />
    </Tab.Navigator>
  );
}
