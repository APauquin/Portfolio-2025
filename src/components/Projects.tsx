import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../styles/Projects.css";
import { useTranslation } from "react-i18next";

interface ProjectsProps {
  setIsTransitioning: (value: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setIsTransitioning }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Handle the click transition
  const handleClick = () => {
    setIsTransitioning(true);
    
    // For mobile, adjust the animation
    const isMobile = window.innerWidth <= 768;
    
    gsap.to(".sections-container", {
      opacity: 0,
      x: isMobile ? "-100vw" : "-100vh", // Use vw for mobile
      duration: isMobile ? 1.5 : 2, // Slightly faster on mobile
      ease: "power2.inOut",
      onComplete: () => {
        navigate("/projects");
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      },
    });
  };

  // Add touch animation effect
  useEffect(() => {
    // For mobile devices, add a tap effect
    const projectsText = document.querySelector(".projects-text");
    
    if (projectsText && window.innerWidth <= 768) {
      projectsText.addEventListener("touchstart", () => {
        gsap.to(projectsText, {
          scale: 1.1,
          duration: 0.3,
        });
      });
      
      projectsText.addEventListener("touchend", () => {
        gsap.to(projectsText, {
          scale: 1,
          duration: 0.3,
        });
      });
    }
    
    return () => {
      if (projectsText) {
        projectsText.removeEventListener("touchstart", () => {});
        projectsText.removeEventListener("touchend", () => {});
      }
    };
  }, []);

  return (
    <div className="projects-container">
      <h1>{t('projects.title', 'Projects')}</h1>
      <p className="projects-text" onClick={handleClick}>
        {t('projects.clickToSee', 'Click here to see what I\'ve accomplished so far!')}
      </p>
    </div>
  );
};

export default Projects;