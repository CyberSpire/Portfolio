
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'accent';
  fullWidth?: boolean;
  href?: string;
  // Added support for common anchor tag attributes when href is present
  target?: string;
  rel?: string;
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
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer group";
  
  const variants = {
    primary: "border-transparent text-white bg-gradient-to-r from-primary via-purple-600 to-accent hover:opacity-100 focus:ring-primary shadow-lg shadow-primary/30",
    accent: "border-transparent text-white bg-accent hover:bg-orange-600 focus:ring-accent shadow-lg shadow-accent/40",
    secondary: "border-border text-text bg-card hover:bg-border focus:ring-primary border shadow-md",
    outline: "border-2 border-primary/40 text-text bg-transparent hover:bg-primary/10 hover:border-primary focus:ring-primary/50",
    white: "border-transparent text-background bg-white hover:bg-gray-100 focus:ring-white/50 shadow-lg shadow-black/20"
  };

  const widthClass = fullWidth ? "w-full" : "";

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const id = targetId.replace(/^#/, '');
    
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
    }, 100);
    
    if (props.onClick) {
      (props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
    }
  };

  const ShineEffect = () => (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{
        repeat: Infinity,
        repeatDelay: 3,
        duration: 1.5,
        ease: "linear",
      }}
      className="absolute inset-0 z-0 w-1/2 h-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
    />
  );

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
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        {...(props as any)}
      >
        <ShineEffect />
        <Content />
      </motion.a>
    );
  }

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <ShineEffect />
      <Content />
    </motion.button>
  );
};
