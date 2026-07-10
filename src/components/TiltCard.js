"use client";
import { useRef, useState } from "react";

export default function TiltCard({ children, className = "", style = {} }) {
  const cardRef = useRef(null);
  const [style3D, setStyle3D] = useState({
    transform: 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
  });
  const [glowStyle, setGlowStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setStyle3D({
      transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none' // Remove transition for instant follow
    });

    // Calculate dynamic glow position
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 60%)`
    });
  };

  const handleMouseLeave = () => {
    setStyle3D({
      transform: `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    });
    setGlowStyle({ opacity: 0, transition: 'opacity 0.5s' });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card ${className}`}
      style={{ ...style, ...style3D, position: 'relative', overflow: 'hidden' }}
    >
      <div 
        className="card-glow" 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 1, ...glowStyle
        }} 
      />
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
