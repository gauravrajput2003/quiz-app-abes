import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={changeLanguage}
        value={i18n.language}
        className="appearance-none bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:bg-blue-600 transition duration-300 cursor-pointer"
      >
         <option value="hi">हिन्दी</option>
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="gu">ગુજરાતી</option>
        <option value="bh">भोजपुरी</option>
      </select>
      {/* Downward arrow icon */}
      <i className="absolute right-2 top-1/2 transform -translate-y-1/2 fas fa-chevron-down text-white pointer-events-none"></i>
    </div>
  );
};

export default LanguageSelector;
