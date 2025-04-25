import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import "../styles/ProjectModal.css";
import { Project } from "../data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t, i18n } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for modal entrance
    const modalElement = modalRef.current;
    if (modalElement) {
      document.body.style.overflow = "hidden"; // Prevent scrolling while modal is open

      gsap.fromTo(
        modalElement,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    // Event listener for ESC key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Cleanup function
    return () => {
      document.body.style.overflow = ""; // Restore scrolling
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleClose = () => {
    const modalElement = modalRef.current;
    if (modalElement) {
      gsap.to(modalElement, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-US';
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        // month: 'long'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Get translated values
  const translatedTitle = t(`projects.projectTitles.${project.title}`, project.title);
  const translatedCategory = project.category ?
    t(`projects.categories.${project.category}`, project.category) : "";
  const translatedLongDescription = t(`projects.longDescriptions.${project.id}`, project.longDescription || project.description);

  // Check if any project links are available
  const hasLinks = project.githubUrl || project.liveUrl;

  return (
    <div className="project-modal-backdrop" onClick={handleBackdropClick}>
      <div className="project-modal-content" ref={modalRef}>
        <button className="project-modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="project-modal-header">
          <h2>{translatedTitle}</h2>
        </div>

        <div className="project-modal-body">
          <div className="project-modal-image-container">
            <img
              src={project.imageUrl}
              alt={translatedTitle}
              className="project-modal-image"
            />
          </div>

          <div className="project-modal-description">
            {translatedLongDescription}
          </div>

          {project.date && (
            <div className="project-modal-section">
              <h3>{t('projectModal.projectDate', 'Project Date')}</h3>
              <div>{formatDate(project.date)}</div>
            </div>
          )}

          {project.category && (
            <div className="project-modal-section">
              <h3>{t('projectModal.category', 'Category')}</h3>
              <div>{translatedCategory}</div>
            </div>
          )}

          <div className="project-modal-section">
            <h3>{t('projectModal.technologiesUsed', 'Technologies Used')}</h3>
            <div className="project-modal-technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="project-modal-tech-tag">
                  {t(`projects.technologies.${tech}`, tech)}
                </span>
              ))}
            </div>
          </div>

          {/* Only render the links section if at least one link exists */}
          {hasLinks && (
            <div className="project-modal-section">
              <h3>{t('projectModal.links', 'Project Links')}</h3>
              <div className="project-modal-buttons">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-button github"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    {t('projectModal.viewCode', 'View Code')}
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-button live"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                    </svg>
                    {t('projectModal.viewLive', 'View Live Demo')}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;