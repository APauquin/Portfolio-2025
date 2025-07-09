import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/About.css";
import { useTranslation } from "react-i18next";

import pic1 from '../assets/pic1.jpg';
import pic2 from '../assets/pic2.jpg';
import pic3 from '../assets/pic3.jpg';
import pic4 from '../assets/pic4.jpg';

const About: React.FC = () => {
  const { t } = useTranslation();
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInstance = useRef<gsap.core.Timeline | null>(null);
  const picturesRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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

    // Add animation for the pictures grid
    if (picturesRef.current) {
      const pictureItems = picturesRef.current.querySelectorAll(".picture-item");
      tl.fromTo(
        pictureItems,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
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
            {isMobile ? (
              // Mobile version - only 3 paragraphs
              <>
                <p>{t('about.mobile.paragraph1')}</p>
                <p>{t('about.mobile.paragraph2')}</p>
                <p>{t('about.mobile.paragraph3')}</p>
              </>
            ) : (
              <>
                <p>{t('about.paragraph1')}</p>
                <p>{t('about.paragraph2')}</p>
                <p>{t('about.paragraph3')}</p>
                <p>{t('about.paragraph4')}</p>
                <p>{t('about.paragraph5')}</p>
              </>
            )}
          </div>
        </div>

        {/* Grid of 4 pictures in bottom left */}
        <div ref={picturesRef} className="pictures-grid">
          <div className="picture-item">
            <img src={pic1} alt="Career moment 1" />
          </div>
          <div className="picture-item">
            <img src={pic4} alt="Career moment 2" />
          </div>
          <div className="picture-item">
            <img src={pic2} alt="Career moment 3" />
          </div>
          <div className="picture-item">
            <img src={pic3} alt="Career moment 4" />
          </div>
        </div>
      </div>
      
      <div className="timeline-section desktop">
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