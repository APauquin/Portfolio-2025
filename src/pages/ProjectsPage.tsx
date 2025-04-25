import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../styles/ProjectsPage.css";
import { useTranslation } from "react-i18next";
import ProjectModal from "../components/ProjectModal";
import projectsData, { Project } from "../data/projects";

const ProjectsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const handleBack = () => {
    gsap.to(".projects-page", {
      opacity: 0,
      x: "100vh",
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        navigate("/");
      },
    });
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-page">
      <div className="wrapper">
        <div className="navigation-controls">
          <div className="back-button" onClick={handleBack}>
            {t('projectsPage.back', 'Back to Home')}
          </div>
          
          {/* Language Switcher */}
          <div className="language-switcher-projects">
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
        </div>

        <h1>{t('projectsPage.title', 'My Projects')}</h1>
        
        <div className="cols">
          {projectsData.map((project) => {
            // Get translated title and category
            const translatedTitle = t(`projects.projectTitles.${project.title}`, project.title);
            const translatedCategory = project.category
               ? t(`projects.categories.${project.category}`, project.category)
              : project.technologies.slice(0, 3).map(tech =>
                   t(`projects.technologies.${tech}`, tech)
                ).join(' • ');
                         
            return (
              <div
                key={project.id}
                className="col"
                onTouchStart={() => {
                  // For touch devices, toggle the hover class
                  const element = document.getElementById(`project-${project.id}`);
                  if (element) element.classList.toggle('hover');
                }}
                id={`project-${project.id}`}
                onClick={() => openProjectModal(project)}
              >
                <div className="container">
                  <div className="front" style={{ backgroundImage: `url(${project.imageUrl})` }}>
                    <div className="inner">
                      <p>{translatedTitle}</p>
                      <span>{translatedCategory}</span>
                    </div>
                  </div>
                  <div className="back">
                    <div className="inner">
                      <p>{t(`projects.descriptions.${project.id}`, project.description)}</p>
                      <div className="view-details">
                        {t('projectsPage.viewDetails', 'View Details')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
};

export default ProjectsPage;