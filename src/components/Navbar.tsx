import React, { useEffect } from "react";
import "../styles/Navbar.css";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  setCurrentSection: (index: number) => void;
  sections: string[];
  isAnimating: React.MutableRefObject<boolean>;
  currentSection: number;
  handleScroll: (event?: WheelEvent, targetSection?: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, currentSection, handleScroll }) => {
  const { t, i18n } = useTranslation();
  
  // On component mount, check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  const changeLanguage = (lng: string) => {
    // Save language preference to localStorage
    localStorage.setItem('userLanguage', lng);
    i18n.changeLanguage(lng);
  };
  
  return (
    <nav className="navbar">
      <ul>
        {sections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => handleScroll(undefined, index)}
              style={{
                color: currentSection === index ? "var(--quinary)" : "var(--font-colour)",
              }}
            >
              {t(`sections.${section.toLowerCase()}`, section)}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Language Switcher */}
      <div className="language-switcher">
        <button 
          className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <button 
          className={`lang-btn ${i18n.language === 'fr' ? 'active' : ''}`}
          onClick={() => changeLanguage('fr')}
        >
          FR
        </button>
      </div>
    </nav>
  );
};

export default Navbar;