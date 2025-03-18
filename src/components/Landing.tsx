import { useEffect, useRef } from "react";
import "../styles/Landing.css";

interface LandingProps {
  currentSection: number;
}

const Landing: React.FC<LandingProps> = ({ currentSection }) => {
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!nameRef.current) return;

      const rect = nameRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      nameRef.current.style.setProperty("--mouse-x", `${x}px`);
      nameRef.current.style.setProperty("--mouse-y", `${y}px`);
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
      left: currentSection === 0 ? "10%" : "30%",
      fontSize: currentSection === 0 ? "80px" : "24px",
      transform: "translateY(-50%)",
    }}
  >
    <span>Alexandre</span>
    <span>Pauquin</span>
  </div>
</div>
  );
};

export default Landing;
