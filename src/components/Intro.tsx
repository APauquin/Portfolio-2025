import React, { useRef } from 'react';
import "../styles/Intro.css";
import { useTranslation } from 'react-i18next';

const Intro: React.FC = () => {
  const { t } = useTranslation();

  const introRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={introRef} className="intro-container">
      <div className="intro-content">
        <h2 className="intro-title">{t('intro.title')}</h2>
      </div>
    </div>
  );
};

export default Intro;
