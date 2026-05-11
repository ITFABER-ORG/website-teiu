import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const { language, setLanguage, isEnglish } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'pt-br' : 'en';

    setLanguage(newLanguage);

    i18n.changeLanguage(newLanguage === 'pt-br' ? 'pt' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      role="switch"
      aria-checked={isEnglish}
      aria-label="Alternar idioma do site"
      className="relative flex items-center bg-black/50 rounded-full p-1 w-16 h-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isEnglish ? 'translate-x-8' : 'translate-x-0'
        }`}
      />

      {/* Bandeira BR */}
      <div
        className={`flex-1 flex justify-center items-center z-10 transition-opacity duration-300 ${
          isEnglish ? 'opacity-40 grayscale' : 'opacity-100'
        }`}
      >
        <img
          src="/assets/img/brasil.png"
          alt="Português"
          className="w-5 h-auto drop-shadow-sm rounded-sm"
        />
      </div>

      {/* Bandeira EUA */}
      <div
        className={`flex-1 flex justify-center items-center z-10 transition-opacity duration-300 ${
          isEnglish ? 'opacity-100' : 'opacity-40 grayscale'
        }`}
      >
        <img
          src="/assets/img/eua.png"
          alt="English"
          className="w-5 h-auto drop-shadow-sm rounded-sm"
        />
      </div>
    </button>
  );
};

export default LanguageToggle;