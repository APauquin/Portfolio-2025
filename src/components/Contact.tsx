import React from "react";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="contact-container">
      <h1>{t('contact.title', 'Contact')}</h1>
      <p>{t('contact.reachOut', 'Feel free to reach out!')}</p>
    </div>
  );
};

export default Contact;
