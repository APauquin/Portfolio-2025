import React from 'react';
import '../styles/Loading.css';
import { useTranslation } from 'react-i18next';

interface LoadingProps {
    progress?: number; 
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
    const { t } = useTranslation();

    const showProgress = progress !== undefined;

    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <div className="loading-logo">
                    <div className="loading-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                            <line x1="12" y1="22" x2="12" y2="15.5"></line>
                            <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                            <line x1="2" y1="15.5" x2="12" y2="8.5"></line>
                            <line x1="12" y1="8.5" x2="22" y2="15.5"></line>
                        </svg>
                    </div>
                </div>

                <h2>{t('loading.title', 'Loading')}</h2>

                {showProgress ? (
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        ></div>
                        <span className="progress-text">{Math.round(progress)}%</span>
                    </div>
                ) : (
                    <div className="loading-spinner"></div>
                )}

                <p className="loading-message">{t('loading.message', 'Preparing an immersive experience...')}</p>
            </div>
        </div>
    );
};

export default Loading;