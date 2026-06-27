import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ExpenseItem } from "../components/ExpenseItem";
import { useExpenses } from "../context/ExpensesContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { formatCurrency } from "../utils/format";

export function ExpensesScreen() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const { expenses, total, removeExpense } = useExpenses();
  const insets = useSafeAreaInsets();

  const confirmDelete = (id: string) => {
    Alert.alert(t("expenses.deleteTitle"), t("expenses.deleteMessage"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => removeExpense(id),
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 16, backgroundColor: theme.primary },
        ]}
      >
        <Text style={[styles.headerLabel, { color: theme.primaryText }]}>
          {t("expenses.total")}
        </Text>
        <Text style={[styles.headerTotal, { color: theme.primaryText }]}>
          {formatCurrency(total, language)}
        </Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ExpenseItem expense={item} onDelete={confirmDelete} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {t("expenses.empty")}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerLabel: { fontSize: 14, opacity: 0.9 },
  headerTotal: { fontSize: 34, fontWeight: "800", marginTop: 4 },
  list: { padding: 16, paddingBottom: 32 },
  empty: { paddingTop: 64, alignItems: "center" },
  emptyText: { fontSize: 15, textAlign: "center" },
});
