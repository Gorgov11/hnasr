import React, { useEffect, useRef, useState, useCallback } from 'react';
import './MagicBento.css';

interface MagicBentoProps {
  children?: React.ReactNode;
  className?: string;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  children,
  className = '',
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = '132, 0, 255'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);

  // Generate particles
  useEffect(() => {
    if (enableStars) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.6 + 0.2
      }));
      setParticles(newParticles);
    }
  }, [enableStars, particleCount]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });

    // Update spotlight position
    if (enableSpotlight && spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(${spotlightRadius}px circle at ${x}px ${y}px, rgba(${glowColor}, 0.1) 0%, transparent 50%)`;
    }

    // Tilt effect
    if (enableTilt && containerRef.current) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      
      containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }, [enableSpotlight, enableTilt, spotlightRadius, glowColor]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = '';
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!clickEffect || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create click ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'magic-bento__ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = `rgba(${glowColor}, 0.3)`;
    
    containerRef.current.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }, [clickEffect, glowColor]);

  const containerClasses = [
    'magic-bento',
    enableBorderGlow && isHovered ? 'magic-bento--glow' : '',
    textAutoHide && isHovered ? 'magic-bento--text-hidden' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        '--glow-color': glowColor,
        '--spotlight-radius': `${spotlightRadius}px`
      } as React.CSSProperties}
    >
      {/* Spotlight overlay */}
      {enableSpotlight && (
        <div 
          ref={spotlightRef}
          className="magic-bento__spotlight"
        />
      )}

      {/* Star particles */}
      {enableStars && (
        <div className="magic-bento__stars">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="magic-bento__star"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
                animationDelay: `${particle.id * 0.2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Border glow */}
      {enableBorderGlow && (
        <div className="magic-bento__border-glow" />
      )}

      {/* Content */}
      <div className="magic-bento__content">
        {children}
      </div>
    </div>
  );
};

export default MagicBento;