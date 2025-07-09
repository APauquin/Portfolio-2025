import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  locale: 'en-US',
  sections: {
    "intro": "Intro",
    "about": "About",
    "timeLine": "TimeLine",
    "projects": "Projects",
    "contact": "Contact"
  },
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
    clickToSee: 'Click here to see what I\'ve accomplished so far!',
    github: 'GitHub',
    liveDemo: 'Live Demo',
    viewMore: 'View More',
    descriptions: {
      1: "A personal portfolio website built with React, ThreeJS and TypeScript to showcase my projects and skills.",
      2: "An accurate reconstruction of the ec665 Tiger I used to work on during my career in the army for use in my portfolio.",
      4: "ThreeJS project of a wave simulation with cubes using sine functions.",
      5: "ThreeJS sphere I created during my studies of ThreeJS following the lessons in a Bruno Simon course.",
      6: "A mobile-friendly web application for tracking CO2 emissions and promoting eco-friendly habits.",
      7: "A gaming streaming platform developed for Origins Digital with freemium content model."
    },
    longDescriptions: {
      1: "This modern, responsive portfolio website was built using React and TypeScript with GSAP animations. The site features smooth page transitions, responsive design for all devices, and internationalization support. The project structure uses a component-based architecture for maintainability and scalability. It includes sections for showcasing projects, skills, and contact information in an engaging and interactive way.",
      2: "This project showcases my 3D modeling and animation skills Blender. I used a model i found here: https://sketchfab.com/3d-models/eurocopter-ec665-tigre-81ab6a12ef9d4e1ba070f51c57a3fb6e, yet I noticed it lacked animations and proper dimensions and reduced the poly count drastically for optimization purposes. I implemented custom textures and shading, updated the cannon and the general dimensions to be more realistic.",
      4: "Cube Wave is a ThreeJS project that simulates a wave effect using cubes. The project utilizes sine functions to create a wave pattern that flows across the screen. The cubes are animated to move in sync with the wave, creating a dynamic effect.",
      5: "An animated sphere that showcases a sphere with a varying surface. The project demonstrates the use of shaders and lighting effects to create a realistic appearance. The sphere is animated to have waves on the surface and change colors.",
      6: "CO2Less is a mobile-friendly web application designed to help users track their CO2 emissions and promote eco-friendly habits. The app allows users to log their daily activities, such as transportation, energy consumption, and waste generation. It provides visualizations of their carbon footprint over time and offers tips for reducing emissions. The application was built to obtain my diploma after my studies.",
      7: "Origins Digital is a comprehensive streaming platform developed during a five-month Web Development training at Wild Code School. Working in a team of four developers, we created a gaming-focused streaming service inspired by Origins Digital's sports platform. The platform features a freemium model with both free and premium content, user account management, an integrated video player with social sharing capabilities, favorites system, and content organization by topic. Built with PHP 8.1 and Symfony 6 framework, the site includes an intuitive admin interface for content management. Key features include user profiles with personalized recommendations, advanced search functionality, dynamic content display, and differentiated access levels for non-registered users, registered users, and administrators. The project leveraged Bootstrap 5 for styling, with custom elements using SASS, JavaScript for dynamic components, and MySQL with Doctrine ORM for database management."
    },
    categories: {
      'Web Development': 'Web Development',
      'Full Stack': 'Full Stack',
      'API Integration': 'API Integration',
      'Web Application': 'Web Application',
      'ThreeJS': 'ThreeJS'
    },
    projectTitles: {
      'Portfolio Website': 'Portfolio Website',
      'Cube Wave': 'Cube Wave',
      'Organic Sphere': 'Organic Sphere',
      'C02Less': 'CO2Less',
      'Origins Digital': 'Origins Digital'
    },
    technologies: {
      'React': 'React',
      'TypeScript': 'TypeScript',
      'GSAP': 'GSAP',
      'i18next': 'i18next',
      'CSS': 'CSS',
      'Responsive Design': 'Responsive Design',
      'Node.js': 'Node.js',
      'Express': 'Express',
      'MongoDB': 'MongoDB',
      'Stripe': 'Stripe',
      'JWT': 'JWT',
      'Redux': 'Redux',
      'ThreeJS': 'ThreeJS',
      'GraphQL': 'GraphQL',
      'TypeORM': 'TypeORM',
      'ApolloServer': 'ApolloServer',
      'PHP 8.1': 'PHP 8.1',
      'Symfony 6': 'Symfony 6',
      'Bootstrap 5': 'Bootstrap 5',
      'SASS': 'SASS',
      'JavaScript': 'JavaScript',
      'MySQL': 'MySQL',
      'Doctrine ORM': 'Doctrine ORM',
      'Twig': 'Twig'
    }
  },
  projectsPage: {
    title: 'My Projects',
    back: 'Back to Home',
    viewDetails: 'View Details',
    sortBy: 'Sort by',
    filterBy: 'Filter by',
    all: 'All',
    date: 'Date',
    featured: 'Featured'
  },
  contact: {
    title: 'Contact',
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your full name',
    companyLabel: 'Company Name',
    companyPlaceholder: 'Enter your company name',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email address',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    contactMethodHelper: 'Either email or phone number is required',
    selectMessageLabel: 'Select a Message',
    selectMessagePlaceholder: '-- Select a pre-made message --',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Enter your message or select a pre-made message above',
    captchaLabel: 'Human Verification',
    preset1: 'I would like to schedule a call.',
    preset2: 'Please contact me via email.',
    errorMissingName: 'Please enter your name.',
    errorContactMethod: 'Please provide either an email address or phone number.',
    errorCaptcha: 'Please verify that you are human by completing the CAPTCHA.',
    successMessage: 'Your message has been sent! I\'ll get back to you soon.',
    submitting: 'Sending...',
    submit: 'Send Message'
  },
  loading: {
    title: 'Loading',
    message: 'Preparing the website...'
  },
  // Project modal translations
  projectModal: {
    technologiesUsed: 'Technologies Used',
    links: 'Project Links',
    viewCode: 'View Code',
    viewLive: 'View Live Demo',
    projectDate: 'Project Date',
    category: 'Category'
  },
  about: {
    title: 'About Me',
    paragraph1: 'My professional journey began with 6 years as a sergeant and aeronautical technician in the Light Aviation of the French ground forces, where I developed a keen sense of discipline, rigor, and teamwork.',
    paragraph2: 'Once my contract ended I decided to pursue a career in web development, something I always wanted to pursue. This led me to join the Wild Code School. This intensive training course, focused on concrete projects and personalized follow-up, allowed me to acquire solid technical foundations in web development.',
    paragraph3: 'My apprenticeship at Nuprod was decisive in my evolution, allowing me to consolidate my skills and work on various projects.',
    paragraph4: 'What characterizes me? Autonomy, adaptability, and strong motivation. I am passionate about technical challenges and always ready to explore new technologies to create innovative solutions.',
    paragraph5: 'Today, as an Application Developer, I continue to evolve and improve in an agile environment where each project is a new learning opportunity.',
    mobile: {
      paragraph1: 'From aeronautical technician in the French Army to web development, my journey is built on discipline and passion for technology. After military service, I pursued my tech dream at Wild Code School.',
      paragraph2: 'My apprenticeship at Nuprod strengthened my skills through diverse projects. Autonomy, adaptability, and continuous learning define my approach to work.',
      paragraph3: 'Today, I develop applications in agile environments, exploring new technologies for innovative solutions while seeking growth opportunities.'
    },
    timeline: {
      job1: {
        title: 'Aeronautical Technician Specialized in Airframe and Engine',
        company: 'French Army Light Aviation (ALAT)'
      },
      job2: {
        title: 'Full Stack PHP Web Developer Training',
        company: 'WILD CODE SCHOOL'
      },
      job3: {
        title: 'React Developer Apprenticeship',
        company: 'NUPROD / WILD CODE SCHOOL'
      },
      job4: {
        date: 'Today',
        title: 'Application Developer',
        company: 'Passionate and always looking for new challenges'
      }
    }
  },
};

// French translations
const frTranslations = {
  locale: 'fr-FR',
  sections: {
    "intro": "Intro",
    "about": "À propos",
    "timeLine": "Chronologie",
    "projects": "Projets",
    "contact": "Contact"
  },
  intro: {
    title: 'Développeur Full-Stack'
  },
  maintenance: {
    title: 'Site en développement',
    description: 'Mon portfolio est actuellement en développement et peut ne pas être entièrement fonctionnel.',
    confirm: 'Je comprends, continuer quand même'
  },
  projects: {
    title: 'Projets',
    clickToSee: 'Cliquez ici pour voir ce que j\'ai accompli jusqu\'à présent !',
    github: 'GitHub',
    liveDemo: 'Démo en ligne',
    viewMore: 'Voir plus',
    descriptions: {
      1: "Un site portfolio personnel construit avec React, ThreeJS et TypeScript pour présenter mes projets et compétences.",
      2: "Une reconstruction précise du Tiger ec665 sur lequel j'ai travaillé pendant ma carrière dans l'armée, pour utilisation dans mon portfolio.",
      4: "Projet ThreeJS d'une simulation d'onde avec des cubes utilisant des fonctions sinus.",
      5: "Sphère ThreeJS que j'ai créée pendant mes études de ThreeJS en suivant les leçons d'un cours de Bruno Simon.",
      6: "Une application web adaptée aux mobiles pour suivre les émissions de CO2 et promouvoir des habitudes écologiques.",
      7: "Une plateforme de streaming de jeux développée pour Origins Digital avec un modèle de contenu freemium."
    },
    longDescriptions: {
      1: "Ce site portfolio moderne et réactif a été construit avec React et TypeScript, avec des animations GSAP. Le site propose des transitions de page fluides, un design responsive pour tous les appareils et une prise en charge de l'internationalisation. La structure du projet utilise une architecture basée sur des composants pour la maintenabilité et l'évolutivité. Il comprend des sections pour présenter des projets, des compétences et des informations de contact de manière engageante et interactive.",
      2: "Ce projet met en valeur mes compétences en modélisation et animation 3D avec Blender. J'ai utilisé un modèle que j'ai trouvé ici: https://sketchfab.com/3d-models/eurocopter-ec665-tigre-81ab6a12ef9d4e1ba070f51c57a3fb6e, mais qui manquait d'animations et de dimensions et d'optimisation appropriées. J'ai implémenté des textures et des ombrages personnalisés, mis à jour le canon et les dimensions générales pour être plus réalistes.",
      4: "Cube Wave est un projet ThreeJS qui simule un effet d'onde en utilisant des cubes. Le projet utilise des fonctions sinus pour créer un motif d'onde qui s'écoule à travers l'écran. Les cubes sont animés pour se déplacer en synchronisation avec l'onde, créant un effet dynamique.",
      5: "Une sphère animée qui présente une surface variable. Le projet démontre l'utilisation de shaders et d'effets d'éclairage pour créer un aspect réaliste. La sphère est animée pour avoir des vagues à sa surface et changer de couleurs.",
      6: "CO2Less est une application web adaptée aux mobiles conçue pour aider les utilisateurs à suivre leurs émissions de CO2 et promouvoir des habitudes écologiques. L'application permet aux utilisateurs de consigner leurs activités quotidiennes, comme les transports, la consommation d'énergie et la production de déchets. Elle fournit des visualisations de leur empreinte carbone au fil du temps et offre des conseils pour réduire les émissions. L'application a été construite pour obtenir mon diplôme après mes études.",
      7: "Origins Digital est une plateforme de streaming complète développée pendant une formation de cinq mois en développement web à la Wild Code School. Travaillant dans une équipe de quatre développeurs, nous avons créé un service de streaming axé sur les jeux, inspiré par la plateforme sportive d'Origins Digital. La plateforme propose un modèle freemium avec du contenu gratuit et premium, une gestion de compte utilisateur, un lecteur vidéo intégré avec des capacités de partage social, un système de favoris et une organisation du contenu par sujet. Construite avec PHP 8.1 et le framework Symfony 6, le site comprend une interface d'administration intuitive pour la gestion du contenu. Les fonctionnalités clés incluent des profils utilisateurs avec des recommandations personnalisées, une fonctionnalité de recherche avancée, un affichage dynamique du contenu et des niveaux d'accès différenciés pour les utilisateurs non enregistrés, les utilisateurs enregistrés et les administrateurs. Le projet a utilisé Bootstrap 5 pour le style, avec des éléments personnalisés utilisant SASS, JavaScript pour les composants dynamiques, et MySQL avec Doctrine ORM pour la gestion de la base de données."
    },
    categories: {
      'Web Development': 'Développement Web',
      'Full Stack': 'Full Stack',
      'API Integration': 'Intégration d\'API',
      'Web Application': 'Application Web',
      'ThreeJS': 'ThreeJS'
    },
    projectTitles: {
      'Portfolio Website': 'Site Portfolio',
      'Cube Wave': 'Cube Wave',
      'Organic Sphere': 'Sphère Organique',
      'C02Less': 'CO2Less',
      'Origins Digital': 'Origins Digital'
    },
    technologies: {
      'React': 'React',
      'TypeScript': 'TypeScript',
      'GSAP': 'GSAP',
      'i18next': 'i18next',
      'CSS': 'CSS',
      'Responsive Design': 'Design Adaptatif',
      'Node.js': 'Node.js',
      'Express': 'Express',
      'MongoDB': 'MongoDB',
      'Stripe': 'Stripe',
      'JWT': 'JWT',
      'Redux': 'Redux',
      'ThreeJS': 'ThreeJS',
      'GraphQL': 'GraphQL',
      'TypeORM': 'TypeORM',
      'ApolloServer': 'ApolloServer',
      'PHP 8.1': 'PHP 8.1',
      'Symfony 6': 'Symfony 6',
      'Bootstrap 5': 'Bootstrap 5',
      'SASS': 'SASS',
      'JavaScript': 'JavaScript',
      'MySQL': 'MySQL',
      'Doctrine ORM': 'Doctrine ORM',
      'Twig': 'Twig'
    }
  },
  projectsPage: {
    title: 'Mes Projets',
    back: 'Retour à l\'accueil',
    viewDetails: 'Voir les détails',
    sortBy: 'Trier par',
    filterBy: 'Filtrer par',
    all: 'Tous',
    date: 'Date',
    featured: 'En vedette'
  },
  contact: {
    title: 'Contact',
    nameLabel: 'Votre Nom',
    namePlaceholder: 'Entrez votre nom complet',
    companyLabel: 'Nom de l\'Entreprise',
    companyPlaceholder: 'Entrez le nom de votre entreprise',
    emailLabel: 'Email',
    emailPlaceholder: 'Entrez votre adresse email',
    phoneLabel: 'Numéro de Téléphone',
    phonePlaceholder: 'Entrez votre numéro de téléphone',
    contactMethodHelper: 'L\'email ou le numéro de téléphone est requis',
    selectMessageLabel: 'Sélectionnez un Message',
    selectMessagePlaceholder: '-- Sélectionnez un message prédéfini --',
    messageLabel: 'Votre Message',
    messagePlaceholder: 'Entrez votre message ou sélectionnez un message prédéfini ci-dessus',
    captchaLabel: 'Vérification Humaine',
    preset1: 'Je souhaiterais planifier un appel.',
    preset2: 'Veuillez me contacter par email.',
    errorMissingName: 'Veuillez entrer votre nom.',
    errorContactMethod: 'Veuillez fournir une adresse email ou un numéro de téléphone.',
    errorCaptcha: 'Veuillez vérifier que vous êtes humain en complétant le CAPTCHA.',
    successMessage: 'Votre message a été envoyé ! Je vous répondrai bientôt.',
    submitting: 'Envoi en cours...',
    submit: 'Envoyer le Message'
  },
  loading: {
    title: 'Chargement',
    message: 'Préparation du site...'
  },
  // Project modal translations
  projectModal: {
    technologiesUsed: 'Technologies Utilisées',
    links: 'Liens du Projet',
    viewCode: 'Voir le Code',
    viewLive: 'Voir la Démo',
    projectDate: 'Date du Projet',
    category: 'Catégorie'
  },
  about: {
    title: 'À Propos de Moi',
    paragraph1: 'Mon parcours professionnel a débuté par 6 années en tant que sergent et technicien aéronautique dans l\'Aviation Légère de l\'Armée de Terre, où j\'ai développé un sens aigu de la discipline, de la rigueur et du travail en équipe.',
    paragraph2: 'Une fois mon contrat terminé, j\'ai décidé de poursuivre une carrière dans le développement web, un domaine qui m\'a toujours passionné. Cela m\'a conduit à rejoindre la Wild Code School. Cette formation intensive, axée sur des projets concrets et un suivi personnalisé, m\'a permis d\'acquérir de solides bases techniques en développement web.',
    paragraph3: 'Mon alternance chez Nuprod a été déterminante dans mon évolution, me permettant de consolider mes compétences et de travailler sur des projets variés.',
    paragraph4: 'Ce qui me caractérise ? Autonomie, adaptabilité et une forte motivation. Je suis passionné par les défis techniques et toujours prêt à explorer de nouvelles technologies pour créer des solutions innovantes.',
    paragraph5: 'Aujourd\'hui, en tant que Concepteur Développeur d\'Applications, je continue à évoluer et à me perfectionner dans un environnement agile où chaque projet est une nouvelle opportunité d\'apprentissage.',
    mobile: {
      paragraph1: 'De technicien aéronautique dans l\'Armée française au développement web, mon parcours est fondé sur la discipline et la passion pour la technologie. Après mon service militaire, j\'ai poursuivi mon rêve tech à la Wild Code School.',
      paragraph2: 'Mon alternance chez Nuprod a renforcé mes compétences à travers des projets variés. L\'autonomie, l\'adaptabilité et l\'apprentissage continu définissent mon approche du travail.',
      paragraph3: 'Aujourd\'hui, je développe des applications dans des environnements agiles, explorant de nouvelles technologies pour des solutions innovantes tout en cherchant à évoluer.'
    },
    timeline: {
      job1: {
        title: 'Technicien aéronautique spécialisé cellule et moteur',
        company: 'Aviation Légère de l\'Armée de Terre (ALAT)'
      },
      job2: {
        title: 'Formation Développeur Web Full Stack PHP',
        company: 'WILD CODE SCHOOL'
      },
      job3: {
        title: 'Alternance Concepteur Développeur React',
        company: 'NUPROD / WILD CODE SCHOOL'
      },
      job4: {
        date: 'Aujourd\'hui',
        title: 'Concepteur développeur d\'applications',
        company: 'Passionné et toujours en quête de nouveaux défis'
      }
    }
  },
};

// Initialize i18next
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
    },

    // Save language preference to localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'userLanguage',
      caches: ['localStorage']
    }
  });

export default i18n;