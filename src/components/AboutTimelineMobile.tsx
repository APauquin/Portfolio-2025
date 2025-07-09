import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/AboutTimelinMobile.css";
import { useTranslation } from "react-i18next";

const AboutTimelineMobile: React.FC = () => {
  const { t } = useTranslation();
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
    
    // Use the querySelectorAll to target the timeline items correctly
    const timelineItems = timelineRef.current?.querySelectorAll(".mobile-timeline-item");
    if (timelineItems?.length) {
      tl.fromTo(
        timelineItems,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.2 }
      );
    }

    // Create an Intersection Observer to trigger the animation when the section is in view
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1 // Trigger when just 10% of the element is visible for faster animation
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
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      // Clean up the observer on component unmount
      observer.disconnect();
    };
  }, []);

  return (
    <div className="about-timeline-section">
      <div className="mobile-timeline-section">
        <div ref={timelineRef} className="mobile-timeline">
          <div className="mobile-timeline-line"></div>
          
          <div className="mobile-timeline-item">
            <div className="mobile-timeline-dot"></div>
            <div className="mobile-timeline-content">
              <h3>2016 - 2023</h3>
              <h4>{t('about.timeline.job1.title')}</h4>
              <p>{t('about.timeline.job1.company')}</p>
            </div>
          </div>
          
          <div className="mobile-timeline-item">
            <div className="mobile-timeline-dot"></div>
            <div className="mobile-timeline-content">
              <h3>2023</h3>
              <h4>{t('about.timeline.job2.title')}</h4>
              <p>{t('about.timeline.job2.company')}</p>
            </div>
          </div>
          
          <div className="mobile-timeline-item">
            <div className="mobile-timeline-dot"></div>
            <div className="mobile-timeline-content">
              <h3>2023 - 2024</h3>
              <h4>{t('about.timeline.job3.title')}</h4>
              <p>{t('about.timeline.job3.company')}</p>
            </div>
          </div>
          
          <div className="mobile-timeline-item">
            <div className="mobile-timeline-dot"></div>
            <div className="mobile-timeline-content">
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

export default AboutTimelineMobile;