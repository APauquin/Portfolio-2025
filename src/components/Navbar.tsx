import React from "react";
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
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <ul>
        {sections.map((title, index) => (
          <li key={index}>
            <button
              onClick={() => handleScroll(undefined, index)}
              style={{
                color: currentSection === index ? "var(--quinary)" : "var(--font-colour)",
              }}
            >
              {title}
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