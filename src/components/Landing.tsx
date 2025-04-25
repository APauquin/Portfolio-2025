import { useEffect, useRef } from "react";
import "../styles/Landing.css";

interface LandingProps {
  currentSection: number;
}

const Landing: React.FC<LandingProps> = ({ currentSection }) => {
  const nameRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="floating-name-container">
      <div
        ref={nameRef}
        className="floating-name"
        style={{
          position: "absolute",
          top: currentSection === 0 ? "50%" : "40px",
          left: currentSection === 0 ? "10%" : "25%",
          fontSize: currentSection === 0 ? "80px" : "24px",
          transform: "translateY(-50%)",
        }}
      >
        <span ref={firstNameRef}>Alexandre</span>
        <span ref={lastNameRef}>Pauquin</span>
      </div>
    </div>
  );
};

export default Landing;