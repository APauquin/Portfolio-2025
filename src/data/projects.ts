export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    category?: string;
    date?: string;
}

import originsDigitalImage from '../assets/origins-digital.png';
import c02LessImage from '../assets/c02less.png';
import organicSphere from '../assets/organic-sphere.png';
import boxWave from '../assets/box-wave.png';
import tiger3DModelImage from '../assets/tiger-3d-model.png';
import portfolioImage from '../assets/portfolio.png';

const projects: Project[] = [
    {
        id: 1,
        title: "Portfolio Website",
        description: "A personal portfolio website built with React, ThreeJs and TypeScript to showcase my projects and skills.",
        longDescription:
            "This modern, responsive portfolio website was built using React and TypeScript with GSAP animations. " +
            "The site features smooth page transitions, responsive design for all devices, and internationalization support. " +
            "The project structure uses a component-based architecture for maintainability and scalability. " +
            "It includes sections for showcasing projects, skills, and contact information in an engaging and interactive way.",
        technologies: ["React", "TypeScript", "GSAP", "i18next", "CSS", "Responsive Design", "ThreeJS"],
        imageUrl: portfolioImage,
        githubUrl: "https://github.com/APauquin/portfolio-2025",
        liveUrl: "alexandrepauquin.com",
        featured: true,
        category: "Web Development",
        date: "2025"
    },
    {
        id: 2,
        title: "Tiger model",
        description: "An accurate recontstruction of the ec665 Tiger I used to work on during my career in the army.", 
        longDescription:
            "This project showcases my 3D modeling and animation skills Blender. " +
            "I used a model i found here but lacked animations and proper dimensions and optimization." +
            "I implemented custom textures and shading, updated the cannon and the general dimensions to be more realistic.",
        technologies: ["blender"],
        imageUrl: tiger3DModelImage,
        featured: true,
        category: "Blender",
        date: "2025"
    },
    {
        id: 4,
        title: "Cube Wave",
        description: "ThreeJS project of a wave simulation with cubes using sine functions.",
        longDescription:
            "Cube Wave is a ThreeJS project that simulates a wave effect using cubes. " +
            "The project utilizes sine functions to create a wave pattern that flows across the screen. " +
            "The cubes are animated to move in sync with the wave, creating a dynamic effect. ",
        technologies: ["React", "ThreeJS"],
        imageUrl: boxWave,
        githubUrl: "https://github.com/APauquin/Cube_wave",
        category: "ThreeJS",
        date: "2025"
    },
    {
        id: 5,
        title: "Organic Sphere",
        description: "ThreeJS sphere i created during my studies of ThreeJS following the lessons in a Bruno Simon course",
        longDescription:
            "An animated sphere with a varying surface." +
            "The project demonstrates the use of shaders and lighting effects to create a realistic appearance. " +
            "The sphere is animated to have waves on the surface and change colors.",
        technologies: ["React", "ThreeJS"],
        imageUrl: organicSphere,
        githubUrl: "https://github.com/APauquin/Wobbly_sphere",
        featured: true,
        category: "ThreeJS",
        date: "2025"
    },
    {
        id: 6,
        title: "C02Less",
        description: "A mobile-friendly web application fir tracking C02 emissions and promoting eco-friendly habits.",
        longDescription:
            "C02Less is a mobile-friendly web application designed to help users track their CO2 emissions and promote eco-friendly habits. " +
            "The app allows users to log their daily activities, such as transportation, energy consumption, and waste generation. " +
            "It provides visualizations of their carbon footprint over time and offers tips for reducing emissions. " +
            "The application was built to obtain my diploma after my studies.",
        technologies: ["React", "Node.js", "GraphQL", "TypeORM", "ApolloServer"],
        imageUrl: c02LessImage,
        githubUrl: "https://github.com/WildCodeSchool/2311-wns-jaune-co2-less",
        category: "Web Development",
        date: "2024"
    },
    {
        id: 7,
        title: "Origins Digital",
        description: "A gaming streaming platform developed for Origins Digital with freemium content model.",
        longDescription:
            "Origins Digital is a comprehensive streaming platform developed during a five-month Web Development training at Wild Code School. " +
            "Working in a team of four developers, we created a gaming-focused streaming service inspired by Origins Digital's sports platform. " +
            "The platform features a freemium model with both free and premium content, user account management, an integrated video player with social sharing capabilities, " +
            "favorites system, and content organization by topic. " +
            "Built with PHP 8.1 and Symfony 6 framework, the site includes an intuitive admin interface for content management. " +
            "Key features include user profiles with personalized recommendations, advanced search functionality, dynamic content display, " +
            "and differentiated access levels for non-registered users, registered users, and administrators. " +
            "The project leveraged Bootstrap 5 for styling, with custom elements using SASS, JavaScript for dynamic components, " +
            "and MySQL with Doctrine ORM for database management.",
        technologies: ["PHP 8.1", "Symfony 6", "Bootstrap 5", "SASS", "JavaScript", "MySQL", "Doctrine ORM", "Twig"],
        imageUrl: originsDigitalImage,
        githubUrl: "https://github.com/WildCodeSchool/2023-03-remote-fr-php-origins-digital",
        category: "Web Development",
        date: "2024"
    }
];

export default projects;