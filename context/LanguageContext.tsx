"use client";

import { createContext, useContext, useState } from "react";
import { en } from "../locals/en";
import { ur } from "../locals/ur";

type Lang = "en" | "ur";

const translations = { en, ur };

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);