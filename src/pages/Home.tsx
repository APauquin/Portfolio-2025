import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import "../styles/Home.css";
import Landing from "../components/Landing";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import Scene from "../three/Scene";
import Maintenance from "../components/Maintenance";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import About from "../components/About";

const sections = ["Intro", "About", "Projects", "Contact"];
gsap.registerPlugin(ScrollToPlugin);

function Home() {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [maintenanceConfirmed, setMaintenanceConfirmed] = useState(false);

  const setCamera = (camera: THREE.PerspectiveCamera) => {
    console.log("Camera set:", camera);
  };

  const setCameraGroup = (group: THREE.Group) => {
    console.log("Camera Group set:", group);
  };

  const handleScroll = (event?: WheelEvent, targetSection?: number) => {
    if (!maintenanceConfirmed || isAnimating.current) return;

    let newSection = currentSection;

    if (targetSection !== undefined) {
      newSection = targetSection;
    } else if (event) {
      if (event.deltaY > 0) {
        newSection = Math.min(currentSection + 1, sections.length - 1);
      } else {
        newSection = Math.max(currentSection - 1, 0);
      }
    }

    if (newSection !== currentSection) {
      isAnimating.current = true;
      setCurrentSection(newSection);

      gsap.to(window, {
        scrollTo: { y: newSection * window.innerHeight },
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      gsap.to(".sections-container", {
        y: `-${newSection * 100}vh`,
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }

    if (event) event.preventDefault();
  };

  useEffect(() => {
    if (maintenanceConfirmed) {
      window.addEventListener("wheel", handleScroll, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [currentSection, maintenanceConfirmed]);

  const handleMaintenanceConfirm = () => {
    setMaintenanceConfirmed(true);
  };

  return (
    <div className="App">
      {!maintenanceConfirmed && (
        <Maintenance onConfirm={handleMaintenanceConfirm} />
      )}
      
      <Scene 
        setCamera={setCamera} 
        setCameraGroup={setCameraGroup}
        currentSection={currentSection} 
        isTransitioning={isTransitioning} 
      />
      <Navbar
        setCurrentSection={setCurrentSection}
        sections={sections}
        isAnimating={isAnimating}
        currentSection={currentSection}
        handleScroll={handleScroll}
      />
      <Landing currentSection={currentSection} />

      <div ref={containerRef} className="sections-container">
        <section id="Intro" className="section">
          <Intro />
        </section>

        <section id="About" className="section">
          <About />
        </section>
        
        <section id="Projects" className="section">
          <Projects setIsTransitioning={setIsTransitioning} />
        </section>
        
        <section id="Contact" className="section">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default Home;