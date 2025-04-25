import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/About.css";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInstance = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Create the timeline but don't play it yet
    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      paused: true
    });
    
    // Store the timeline instance in a ref so we can access it in the observer callback
    timelineInstance.current = tl;
    
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    
    tl.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );
    
    // Use the querySelectorAll to target the timeline items correctly
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
    if (timelineItems?.length) {
      tl.fromTo(
        timelineItems,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
        "-=0.5"
      );
    }

    // Create an Intersection Observer to trigger the animation when the section is in view
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.25 // Trigger when 25% of the element is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When entering the viewport, play the animation forward
          timelineInstance.current?.play();
        } else {
          // When leaving the viewport, reverse the animation
          timelineInstance.current?.reverse();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (aboutContainerRef.current) {
      observer.observe(aboutContainerRef.current);
    }

    return () => {
      // Clean up the observer on component unmount
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={aboutContainerRef} className="about-container">
      <div className="about-left-section">
        <h2 ref={titleRef} className="about-title">{t('about.title')}</h2>
        
        <div ref={contentRef} className="about-content">
          <div className="about-text">
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
            <p>{t('about.paragraph3')}</p>
            <p>{t('about.paragraph4')}</p>
            <p>{t('about.paragraph5')}</p>
          </div>
        </div>
      </div>
      
      <div className="timeline-section">
        <div ref={timelineRef} className="timeline">
          <div className="timeline-line"></div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2016 - 2023</h3>
              <h4>{t('about.timeline.job1.title')}</h4>
              <p>{t('about.timeline.job1.company')}</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2023</h3>
              <h4>{t('about.timeline.job2.title')}</h4>
              <p>{t('about.timeline.job2.company')}</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>2023 - 2024</h3>
              <h4>{t('about.timeline.job3.title')}</h4>
              <p>{t('about.timeline.job3.company')}</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{t('about.timeline.job4.date')}</h3>
              <h4>{t('about.timeline.job4.title')}</h4>
              <p>{t('about.timeline.job4.company')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;