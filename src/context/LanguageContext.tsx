import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { i18n } from "../i18n/i18n";
import type { Language } from "../i18n/translations";
import { loadLanguage, saveLanguage } from "../storage/storage";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    loadLanguage().then((stored) => {
      if (stored) {
        setLanguageState(stored);
        i18n.locale = stored;
      }
    });
  }, []);

  const setLanguage = (next: Language) => {
    i18n.locale = next;
    setLanguageState(next);
    void saveLanguage(next);
  };

  const t = useCallback(
    (key: string, options?: Record<string, unknown>) => i18n.t(key, options),
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}
