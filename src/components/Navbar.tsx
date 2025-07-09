import React, { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleNavClick = (index: number) => {
    handleScroll(undefined, index);
    setMenuOpen(false); // Close the menu after selection
  };
  
  // Language selector component (used in both mobile and desktop)
  const LanguageSwitcher = () => (
    <div className={`language-switcher ${isMobile ? 'mobile' : ''}`}>
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
  );
  
  return (
    <nav className={`navbar ${currentSection !== 0 ? 'with-background' : ''}`}>
      {/* Hamburger Icon for Mobile */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div className={`burger-bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`burger-bar ${menuOpen ? 'open' : ''}`}></div>
      </div>
      
      {/* Desktop & Mobile Menu */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <ul>
          {sections.map((section, index) => (
            <li key={index}>
              <button
                onClick={() => handleNavClick(index)}
                style={{
                  color: currentSection === index ? "var(--quinary)" : "var(--font-colour)",
                }}
              >
                {t(`sections.${section.toLowerCase()}`, section)}
              </button>
            </li>
          ))}
          
          {/* Language switcher inside mobile menu */}
          {isMobile && (
            <li className="mobile-language-container">
              <LanguageSwitcher />
            </li>
          )}
        </ul>
      </div>
      
      {/* Language Switcher for Desktop Only */}
      {!isMobile && <LanguageSwitcher />}
    </nav>
  );
};

export default Navbar;