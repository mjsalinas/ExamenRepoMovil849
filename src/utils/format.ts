import type { Language } from "../i18n/translations";

export function formatCurrency(amount: number, language: Language): string {
  const locale = language === "en" ? "en-US" : "es-HN";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "HNL",
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `L ${amount.toFixed(2)}`;
  }
}

export function formatDate(iso: string, language: Language): string {
  const locale = language === "en" ? "en-US" : "es-HN";
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
