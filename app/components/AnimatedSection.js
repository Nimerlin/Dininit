// components/AnimatedSection.js
"use client"; // To ensure this is client-side rendered

import { useEffect } from "react";
import gsap from "gsap";

const AnimatedSection = ({ children, className, animationProps }) => {
  useEffect(() => {
    gsap.fromTo(
      `.${className}`,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, stagger: animationProps?.stagger || 0.3 }
    );
  }, [className, animationProps]);

  return <div className={className}>{children}</div>;
};

export default AnimatedSection;
