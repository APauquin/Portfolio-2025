import React, { useState, useEffect } from 'react';
import '../styles/Maintenance.css';
import { useTranslation } from 'react-i18next';

interface MaintenanceProps {
    message?: string;
    onConfirm?: () => void;
}

const Maintenance: React.FC<MaintenanceProps> = ({
    onConfirm
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const { t, i18n } = useTranslation();
    
    // Disable the wheel event handler when overlay is shown
    useEffect(() => {
        if (isVisible) {
            const preventScroll = (e: WheelEvent) => {
                e.preventDefault();
                e.stopPropagation();
            };
            
            window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
            
            return () => {
                window.removeEventListener('wheel', preventScroll, { capture: true });
            };
        }
    }, [isVisible]);
    
    const handleConfirm = () => {
        setIsVisible(false);
        if (onConfirm) onConfirm();
    };
    
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    
    if (!isVisible) return null;
    
    return (
        <div className="maintenance-overlay">
            <div className="maintenance-content">
                <div className="construction-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                        <line x1="12" y1="22" x2="12" y2="15.5"></line>
                        <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                        <line x1="2" y1="15.5" x2="12" y2="8.5"></line>
                        <line x1="12" y1="8.5" x2="22" y2="15.5"></line>
                    </svg>
                </div>
                <h2>{t('maintenance.title')}</h2>
                <p>{t('maintenance.description')}</p>
                
                {/* Language Switcher */}
                <div className="maintenance-language-switcher">
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
                
                <button className="confirm-button" onClick={handleConfirm}>
                    {t('maintenance.confirm')}
                </button>
            </div>
        </div>
    );
};

export default Maintenance;