import { useEffect, useRef, useState } from "react";
import "../styles/Landing.css";

interface LandingProps {
  currentSection: number;
}

const Landing: React.FC<LandingProps> = ({ currentSection }) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                            window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    // Run initially
    checkMobile();
    
    // Also check when window resizes
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Skip mouse effects on mobile devices
    if (isMobile) {
      // Set default center position for gradient on mobile
      if (firstNameRef.current && lastNameRef.current) {
        const setCenterGradient = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          element.style.setProperty("--mouse-x", `${centerX}px`);
          element.style.setProperty("--mouse-y", `${centerY}px`);
        };
        
        setCenterGradient(firstNameRef.current);
        setCenterGradient(lastNameRef.current);
      }
      return;
    }

    // Desktop mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!nameRef.current || !firstNameRef.current || !lastNameRef.current) return;
      
      const firstNameRect = firstNameRef.current.getBoundingClientRect();
      const lastNameRect = lastNameRef.current.getBoundingClientRect();
      
      const firstNameX = event.clientX - firstNameRect.left;
      const firstNameY = event.clientY - firstNameRect.top;
      firstNameRef.current.style.setProperty("--mouse-x", `${firstNameX}px`);
      firstNameRef.current.style.setProperty("--mouse-y", `${firstNameY}px`);
      
      const lastNameX = event.clientX - lastNameRect.left;
      const lastNameY = event.clientY - lastNameRect.top;
      lastNameRef.current.style.setProperty("--mouse-x", `${lastNameX}px`);
      lastNameRef.current.style.setProperty("--mouse-y", `${lastNameY}px`);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className="floating-name-container">
      <div
        ref={nameRef}
        className={`floating-name ${currentSection === 0 ? "main-section" : "scrolled-section"}`}
      >
        <span ref={firstNameRef}>Alexandre</span>
        <span ref={lastNameRef}>Pauquin</span>
      </div>
    </div>
  );
};

export default Landing;