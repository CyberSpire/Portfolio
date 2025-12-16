import React, { useState, useEffect } from 'react';
import { Home, Layers, Zap, Image, DollarSign, User, MessageCircle, Rocket } from 'lucide-react';
import { NavBar } from './ui/tubelight-navbar';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold can be adjusted. 50px is usually enough to clear the very top.
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        {/* Fixed Logo in Top Left for Branding - Adapts to background */}
        <div className={cn(
            "fixed z-50 transition-all duration-300 ease-in-out",
            isScrolled ? "top-4 left-4 md:top-6 md:left-8" : "top-6 left-6 md:top-8 md:left-8"
        )}>
            <a 
                href="#" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className={cn(
                    "flex items-center gap-2 group cursor-pointer p-2 rounded-xl transition-all duration-300",
                    isScrolled 
                        ? "bg-white/80 backdrop-blur-md shadow-sm border border-gray-200/50 hover:bg-white" 
                        : "bg-transparent hover:bg-white/10"
                )}
            >
                <div className={cn(
                    "p-1.5 rounded-lg transition-colors duration-300",
                    isScrolled ? "bg-blue-600 text-white group-hover:bg-purple-600" : "bg-white text-blue-600"
                )}>
                    <Rocket size={20} />
                </div>
                <span className={cn(
                    "hidden sm:block text-lg font-bold tracking-tight transition-colors duration-300",
                    isScrolled ? "text-gray-900" : "text-white"
                )}>
                    Momentum Web
                </span>
            </a>
        </div>

        {/* Tubelight Navigation - Passed scroll state for styling */}
        <NavBar items={navItems} isScrolled={isScrolled} />
    </>
  );
};