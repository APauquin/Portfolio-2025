import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  intro: {
    title: 'Full-Stack Developer'
  },
  maintenance: {
    title: 'Site in development',
    description: 'My portfolio is currently under development and may not be fully functional.',
    confirm: 'I understand, continue anyway'
  },
  projects: {
    title: 'Projects',
    clickToSee: 'Click here to see what I\'ve accomplished so far!'
  },
  contact: {
    title: 'Contact',
    reachOut: 'Feel free to reach out!'
  },
  loading: {
    title: 'Loading',
    message: 'Preparing the website...'
  }
};

// French translations
const frTranslations = {
  intro: {
    title: 'Développeur Full-Stack'
  },
  maintenance: {
    title: 'Site en développement',
    description: 'Mon portfolio est actuellement en développement et peut ne pas être entièrement fonctionnelle.',
    confirm: 'Je comprends, continuer quand même'
  },
  projects: {
    title: 'Projets',
    clickToSee: 'Cliquez ici pour voir ce que j\'ai accompli jusqu\'à présent !'
  },
  contact: {
    title: 'Contact',
    reachOut: 'N\'hésitez pas à me contacter !'
  },
  loading: {
    title: 'Chargement',
    message: 'Préparation du site...'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      fr: {
        translation: frTranslations
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;