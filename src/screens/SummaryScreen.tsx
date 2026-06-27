import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES, CATEGORY_ICONS, type ExpenseCategory } from "../types/expense";
import { formatCurrency } from "../utils/format";
import { useAppSelector } from "../store/store";

export function SummaryScreen() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const insets = useSafeAreaInsets();

  const { expenses } = useAppSelector((state) => state.expenses);

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const byCategory = useMemo(() => {
    const totals = {} as Record<ExpenseCategory, number>;
    for (const cat of CATEGORIES) totals[cat] = 0;
    for (const item of expenses) totals[item.category] += item.amount;
    
    return CATEGORIES.map((cat) => ({
      category: cat,
      amount: totals[cat],
      percent: total > 0 ? (totals[cat] / total) * 100 : 0,
    })).filter((entry) => entry.amount > 0);
  }, [expenses, total]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Text style={[styles.heading, { color: theme.text }]}>{t("summary.title")}</Text>

      <View style={styles.cards}>
        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t("summary.total")}
          </Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {formatCurrency(total, language)}
          </Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {t("summary.count")}
          </Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {expenses.length}
          </Text>
        </View>
      </View>

      <Text style={[styles.subheading, { color: theme.text }]}>
        {t("summary.byCategory")}
      </Text>

      {byCategory.length === 0 ? (
        <Text style={[styles.empty, { color: theme.textSecondary }]}>
          {t("summary.empty")}
        </Text>
      ) : (
        byCategory.map((entry) => (
          <View
            key={entry.category}
            style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={[styles.iconWrap, { backgroundColor: theme.primary + "22" }]}>
              <Ionicons
                name={CATEGORY_ICONS[entry.category] as never}
                size={20}
                color={theme.primary}
              />
            </View>
            <View style={styles.rowInfo}>
              <View style={styles.rowTop}>
                <Text style={[styles.rowTitle, { color: theme.text }]}>
                  {t(`categories.${entry.category}`)}
                </Text>
                <Text style={[styles.rowAmount, { color: theme.text }]}>
                  {formatCurrency(entry.amount, language)}
                </Text>
              </View>
              <View style={[styles.barTrack, { backgroundColor: theme.border }]}>
                <View
                  style={[
                    styles.barFill,
                    {
                      backgroundColor: theme.primary,
                      width: `${entry.percent}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.percent, { color: theme.textSecondary }]}>
                {entry.percent.toFixed(1)}%
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  heading: { fontSize: 24, fontWeight: "800", marginBottom: 16 },
  cards: { flexDirection: "row", gap: 12 },
  statCard: { flex: 1, borderWidth: 1, borderRadius: 16, padding: 16 },
  statLabel: { fontSize: 13 },
  statValue: { fontSize: 22, fontWeight: "800", marginTop: 6 },
  subheading: { fontSize: 18, fontWeight: "700", marginTop: 24, marginBottom: 12 },
  empty: { fontSize: 15, marginTop: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 10 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  rowInfo: { flex: 1 },
  rowTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  rowTitle: { fontSize: 15, fontWeight: "600" },
  rowAmount: { fontSize: 15, fontWeight: "700" },
  barTrack: { height: 8, borderRadius: 4, overflow: "hidden" },
  barFill: { height: 8, borderRadius: 4 },
  percent: { fontSize: 12, marginTop: 4, textAlign: "right" },
});