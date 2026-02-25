import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create particles
    const particleCount = 20;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      
      // Random properties
      const size = Math.random() * 100 + 20; // 20px - 120px
      const posX = Math.random() * width;
      const posY = Math.random() * height;
      const opacity = Math.random() * 0.3 + 0.1; // 0.1 - 0.4
      
      // Styling
      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";
      particle.style.background = "white";
      particle.style.opacity = `${opacity}`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.filter = "blur(40px)";
      particle.style.zIndex = "0";
      particle.style.pointerEvents = "none";

      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle) => {
      gsap.to(particle, {
        x: "random(-200, 200)",
        y: "random(-200, 200)",
        scale: "random(0.5, 1.5)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      
      gsap.to(particle, {
        opacity: "random(0.1, 0.4)",
        duration: "random(5, 10)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      // Cleanup
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedBackground;
