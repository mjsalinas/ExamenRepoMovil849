import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExpenseItem } from "../components/ExpenseItem";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { formatCurrency } from "../utils/format";

// Importaciones de Redux
import { useAppDispatch, useAppSelector } from "../store/store";
import { removeExpense } from "../store/expensesSlice";

export function ExpensesScreen() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const insets = useSafeAreaInsets();
  
  // Conexión a Redux Toolkit
  const dispatch = useAppDispatch();
  const { expenses } = useAppSelector((state) => state.expenses);

  // Cálculo del total dinámico mediante reduce (como pide la rúbrica)
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const confirmDelete = (id: string) => {
    Alert.alert(t("expenses.deleteTitle"), t("expenses.deleteMessage"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => dispatch(removeExpense(id)), // Despacho de la acción de borrado
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