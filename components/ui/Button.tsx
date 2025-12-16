import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  fullWidth?: boolean;
  href?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  href,
  className = '',
  ...props 
}) => {
  // Base styles including positioning for the shimmer effect
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer";
  
  // Enhanced variants with gradients and colored shadows
  const variants = {
    primary: "border-transparent text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50",
    secondary: "border-transparent text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
    outline: "border-2 border-gray-200 text-gray-700 bg-white hover:border-blue-600 hover:text-blue-600 focus:ring-blue-500",
    white: "border-transparent text-blue-700 bg-white hover:bg-gray-50 focus:ring-white/50 shadow-lg shadow-black/10 hover:shadow-xl"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const id = targetId.replace(/^#/, '');
    
    // Small timeout ensures robustness especially on mobile devices
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; // Navbar height approx
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
    }, 100);
    
    // Execute original onClick if it exists
    if (props.onClick) {
      (props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
    }
  };

  // Content wrapper to ensure text stays above the shimmer effect
  const Content = () => (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  );

  if (href) {
    const isAnchor = href.startsWith('#');
    
    return (
      <motion.a 
        href={href}
        onClick={isAnchor ? (e) => handleSmoothScroll(e, href) : undefined}
        className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        <Content />
      </motion.a>
    );
  }

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <Content />
    </motion.button>
  );
};