import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useExpenses } from "../context/ExpensesContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import type { Language } from "../i18n/translations";

export function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { clearExpenses } = useExpenses();
  const insets = useSafeAreaInsets();

  const onClear = () => {
    Alert.alert(t("settings.clearTitle"), t("settings.clearMessage"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.confirm"),
        style: "destructive",
        onPress: () => clearExpenses(),
      },
    ]);
  };

  const languages: { code: Language; label: string }[] = [
    { code: "es", label: t("settings.spanish") },
    { code: "en", label: t("settings.english") },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Text style={[styles.heading, { color: theme.text }]}>
        {t("settings.title")}
      </Text>

      <Text style={[styles.section, { color: theme.textSecondary }]}>
        {t("settings.appearance")}
      </Text>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={styles.rowBetween}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={20} color={theme.text} />
            <Text style={[styles.rowLabel, { color: theme.text }]}>
              {t("settings.darkMode")}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ true: theme.primary }}
          />
        </View>
      </View>

      <Text style={[styles.section, { color: theme.textSecondary }]}>
        {t("settings.language")}
      </Text>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        {languages.map((item, index) => {
          const active = item.code === language;
          return (
            <Pressable
              key={item.code}
              onPress={() => setLanguage(item.code)}
              style={[
                styles.rowBetween,
                index > 0 && { borderTopWidth: 1, borderTopColor: theme.border },
              ]}
            >
              <View style={styles.rowLeft}>
                <Ionicons
                  name="language-outline"
                  size={20}
                  color={theme.text}
                />
                <Text style={[styles.rowLabel, { color: theme.text }]}>
                  {item.label}
                </Text>
              </View>
              {active && (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={theme.primary}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.section, { color: theme.textSecondary }]}>
        {t("settings.data")}
      </Text>
      <Pressable
        onPress={onClear}
        style={[
          styles.card,
          styles.rowBetween,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={styles.rowLeft}>
          <Ionicons name="trash-outline" size={20} color={theme.danger} />
          <Text style={[styles.rowLabel, { color: theme.danger }]}>
            {t("settings.clearData")}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  heading: { fontSize: 24, fontWeight: "800", marginBottom: 8 },
  section: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom: 8,
  },
  card: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 16 },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowLabel: { fontSize: 16, fontWeight: "500" },
});
