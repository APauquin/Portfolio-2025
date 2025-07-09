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
import AboutTimelineMobile from "../components/AboutTimelineMobile";

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Update on window resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const sections = isMobile
    ? ["Intro", "About", "Timeline", "Projects", "Contact"]
    : ["Intro", "About", "Projects", "Contact"];

  gsap.registerPlugin(ScrollToPlugin);

  const [currentSection, setCurrentSection] = useState<number>(0);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [maintenanceConfirmed, setMaintenanceConfirmed] = useState(false);

  // For touch events
  const touchStartY = useRef<number | null>(null);

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

  // Handle touch start event
  const handleTouchStart = (e: TouchEvent) => {
    if (!maintenanceConfirmed || isAnimating.current) return;
    touchStartY.current = e.touches[0].clientY;
  };

  // Handle touch end event
  const handleTouchEnd = (e: TouchEvent) => {
    if (!maintenanceConfirmed || isAnimating.current || touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // Threshold to determine if it's a significant swipe (adjust as needed)
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe up - go to next section
        handleScroll(undefined, Math.min(currentSection + 1, sections.length - 1));
      } else {
        // Swipe down - go to previous section
        handleScroll(undefined, Math.max(currentSection - 1, 0));
      }
    }

    touchStartY.current = null;
  };

  // Handle touch move to prevent default scrolling behavior
  const handleTouchMove = (e: TouchEvent) => {
    if (!maintenanceConfirmed) return;
    e.preventDefault();
  };

  useEffect(() => {
    if (maintenanceConfirmed) {
      // Desktop scroll
      window.addEventListener("wheel", handleScroll, { passive: false });

      // Mobile touch events
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleScroll);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("touchmove", handleTouchMove);
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
        isMobile={isMobile}
      />
      
      <Landing currentSection={currentSection} />

      <Navbar
        setCurrentSection={setCurrentSection}
        sections={sections}
        isAnimating={isAnimating}
        currentSection={currentSection}
        handleScroll={handleScroll}
      />

      <div ref={containerRef} className="sections-container">
        <section id="Intro" className="section">
          <Intro />
        </section>

        <section id="About" className="section">
          <About />
        </section>

        {/* Mobile-only About Timeline section */}
        {isMobile && (
          <section id="AboutTimeline" className="section">
            <AboutTimelineMobile />
          </section>
        )}

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