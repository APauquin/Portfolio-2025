import { useTranslation } from "react-i18next";
import "../styles/ProjectFlipCard.css";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  onClick: () => void;
}

const ProjectFlipCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveUrl,
  onClick,
}) => {
  const { t } = useTranslation();

  const handleLinkClick = (e: React.MouseEvent, url?: string) => {
    if (!url) return;
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="project-col">
      <div className="project-container" onClick={onClick}>
        <div
          className="project-front"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <div className="project-inner">
            <p>{title}</p>
            <span className="project-subtitle">
              {technologies.slice(0, 3).join(' • ')}
              {technologies.length > 3 && '...'}
            </span>
          </div>
        </div>
        <div className="project-back">
          <div className="project-inner">
            <p className="project-description">{description}</p>
            <div className="project-techs">
              {technologies.map((tech, index) => (
                <span key={index} className="project-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-back-links">
              {githubUrl && (
                <button
                  className="project-link-btn"
                  onClick={(e) => handleLinkClick(e, githubUrl)}
                >
                  {t('projects.github', 'GitHub')}
                </button>
              )}
              {liveUrl && (
                <button
                  className="project-link-btn live"
                  onClick={(e) => handleLinkClick(e, liveUrl)}
                >
                  {t('projects.liveDemo', 'Live Demo')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFlipCard;