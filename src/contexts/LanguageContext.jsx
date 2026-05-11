// src/context/LanguageContext.jsx

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("pt-br");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt-br" ? "en" : "pt-br"));
  };

  const isEnglish = language === "en";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isEnglish,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);