import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { CATEGORY_ICONS, type Expense } from "../types/expense";
import { formatCurrency, formatDate } from "../utils/format";

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: Props) {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: theme.primary + "22" }]}>
        <Ionicons
          name={CATEGORY_ICONS[expense.category] as never}
          size={22}
          color={theme.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {expense.title}
        </Text>
        <Text style={[styles.meta, { color: theme.textSecondary }]}>
          {t(`categories.${expense.category}`)} ·{" "}
          {formatDate(expense.date, language)}
        </Text>
      </View>

      <Text style={[styles.amount, { color: theme.text }]}>
        {formatCurrency(expense.amount, language)}
      </Text>

      <Pressable
        hitSlop={10}
        onPress={() => onDelete(expense.id)}
        style={styles.delete}
      >
        <Ionicons name="trash-outline" size={20} color={theme.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600" },
  meta: { fontSize: 13, marginTop: 2 },
  amount: { fontSize: 16, fontWeight: "700" },
  delete: { padding: 4 },
});
