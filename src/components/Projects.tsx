import React from "react";
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

  const handleClick = () => {
    setIsTransitioning(true);
    gsap.to(".sections-container", {
      opacity: 0,
      x: "-100vh",
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        navigate("/projects");
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      },
    });
  };

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