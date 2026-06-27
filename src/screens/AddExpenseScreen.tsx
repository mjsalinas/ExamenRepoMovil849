import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useExpenses } from "../context/ExpensesContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import {
  CATEGORIES,
  CATEGORY_ICONS,
  type ExpenseCategory,
} from "../types/expense";

export function AddExpenseScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { addExpense } = useExpenses();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");

  const reset = () => {
    setTitle("");
    setAmount("");
    setCategory("food");
  };

  const onSave = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      Alert.alert(t("add.errorTitle"), t("add.errorName"));
      return;
    }
    const value = Number(amount.replace(",", "."));
    if (!Number.isFinite(value) || value <= 0) {
      Alert.alert(t("add.errorTitle"), t("add.errorAmount"));
      return;
    }

    addExpense({ title: trimmed, amount: value, category });
    reset();
    Alert.alert(t("add.saved"));
    navigation.navigate("ExpensesTab");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.heading, { color: theme.text }]}>
        {t("add.title")}
      </Text>

      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {t("add.name")}
      </Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={t("add.namePlaceholder")}
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {t("add.amount")}
      </Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder={t("add.amountPlaceholder")}
        placeholderTextColor={theme.textSecondary}
        keyboardType="decimal-pad"
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {t("add.category")}
      </Text>
      <View style={styles.categories}>
        {CATEGORIES.map((cat) => {
          const active = cat === category;
          return (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: active ? theme.primary : theme.card,
                  borderColor: active ? theme.primary : theme.border,
                },
              ]}
            >
              <Ionicons
                name={CATEGORY_ICONS[cat] as never}
                size={16}
                color={active ? theme.primaryText : theme.textSecondary}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: active ? theme.primaryText : theme.text },
                ]}
              >
                {t(`categories.${cat}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={onSave}
        style={[styles.saveButton, { backgroundColor: theme.primary }]}
      >
        <Ionicons name="save-outline" size={20} color={theme.primaryText} />
        <Text style={[styles.saveText, { color: theme.primaryText }]}>
          {t("add.save")}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  heading: { fontSize: 24, fontWeight: "800", marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  categoryText: { fontSize: 14, fontWeight: "500" },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 28,
  },
  saveText: { fontSize: 16, fontWeight: "700" },
});
