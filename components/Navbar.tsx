
import React, { useState, useEffect } from 'react';
import { Home, Layers, Zap, Image, DollarSign, User, MessageCircle } from 'lucide-react';
import { NavBar } from './ui/tubelight-navbar';
import { cn } from '../lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';

export const BrandLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={cn("w-8 h-8", className)}
    aria-label="Momentum Web Logo"
  >
    <defs>
      <linearGradient id="logoShardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
      
      <linearGradient id="logoShardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>

      <filter id="logoStaticDepth" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
      </filter>
    </defs>

    <g filter="url(#logoStaticDepth)">
      <path 
        d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z" 
        stroke="url(#logoShardGrad2)" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      <path d="M50 8 L86 29 V71 L50 92 L14 71 V29 L50 8Z" fill="#0B0118" />
      <path d="M25 70 V35 L40 50 L35 75 L25 70Z" fill="url(#logoShardGrad1)" />
      <path d="M40 50 L50 30 L60 50 L50 40 L40 50Z" fill="#FFFFFF" />
      <path d="M60 50 L75 35 V70 L65 75 L60 50Z" fill="url(#logoShardGrad2)" />
      <path d="M40 60 L50 75 L60 60 L50 55 L40 60Z" fill="#F97316" />
    </g>
  </svg>
);

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (targetId === '#' || targetId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = targetId.replace(/^#/, '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Services', url: '#services', icon: Layers },
    { name: 'Process', url: '#process', icon: Zap },
    { name: 'Portfolio', url: '#portfolio', icon: Image },
    { name: 'Pricing', url: '#pricing', icon: DollarSign },
    { name: 'About', url: '#about', icon: User },
    { name: 'Contact', url: '#contact', icon: MessageCircle }
  ];

  return (
    <>
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[100] origin-left shadow-[0_0_10px_#F97316]"
          style={{ scaleX }}
        />
        <div className={cn(
            "fixed z-[60] transition-all duration-500 ease-in-out",
            isScrolled ? "top-3 left-4" : "top-5 left-6"
        )}>
            <a 
                href="#" 
                aria-label="Back to top"
                onClick={(e) => handleSmoothScroll(e, '#')}
                className={cn(
                    "flex items-center gap-3 group cursor-pointer p-2 pr-5 rounded-2xl transition-all duration-300 border backdrop-blur-3xl shadow-2xl",
                    isScrolled ? "bg-card/95 border-white/10" : "bg-white/5 border-white/5"
                )}
            >
                <div className="relative">
                  <BrandLogo className={cn(
                      "transition-all duration-300",
                      isScrolled ? "w-6 h-6" : "w-11 h-11"
                  )} />
                  <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col justify-center">
                    <span className={cn(
                        "font-display font-black leading-none text-white uppercase transition-all duration-300 italic tracking-tighter",
                        isScrolled ? "text-base" : "text-2xl"
                    )}>
                        MOMENTUM <span className="text-accent not-italic font-extrabold ml-2">WEB</span>
                    </span>
                    <span className={cn(
                        "font-black tracking-[0.4em] text-accent/70 uppercase transition-all duration-300 leading-tight",
                        isScrolled ? "text-[7px]" : "text-[9px] mt-0.5"
                    )}>
                        PROPELLING SUCCESS
                    </span>
                </div>
            </a>
        </div>
        <NavBar items={navItems} isScrolled={isScrolled} />
    </>
  );
};