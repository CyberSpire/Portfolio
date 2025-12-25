
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const textVariants = {
    hidden: { y: 150, skewY: 10 },
    visible: { y: 0, skewY: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 px-4 md:px-6">
      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Floating Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.3em] text-accent"
        >
          Propelling Business Growth
        </motion.div>

        {/* Massive Title */}
        <div className="relative mb-8 md:mb-12 flex flex-col items-center w-full">
            <div className="overflow-hidden w-full">
                <motion.h1 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[14vw] md:text-[10vw] font-display font-black leading-[0.85] text-white uppercase tracking-tighter text-center"
                >
                    Rank Higher.
                </motion.h1>
            </div>
            <div className="overflow-hidden w-full -mt-[2vw] md:-mt-[1vw]">
                <motion.h1 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[14vw] md:text-[10vw] font-display font-black leading-[0.85] text-outline uppercase tracking-tighter text-center"
                >
                    Convert Faster.
                </motion.h1>
            </div>
        </div>

        {/* Hero Image / Video Frame */}
        <motion.div 
          style={{ y, scale, opacity }}
          className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
        >
            <img 
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2670&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-1000"
                alt="Digital Agency Workspace"
            />
            
            {/* Improved Mobile Visibility Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent md:from-background/80 md:via-transparent" />
            
            {/* CTA Overlay - Adjusted for Mobile Visibility */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-6 text-center md:text-left">
                <p className="text-white/90 md:text-white/60 text-sm md:text-xl font-bold md:font-medium max-w-[280px] md:max-w-sm leading-tight drop-shadow-lg">
                    We engineer high-performance systems for ambitious brands.
                </p>
                <div className="flex gap-4 w-full md:w-auto justify-center">
                    <Button href="#contact" variant="accent" className="rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base w-full md:w-auto shadow-2xl">
                        Start a Project <ArrowDownRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Decorative Background Text with Shimmer */}
      <motion.div 
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className={cn(
          "absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black whitespace-nowrap pointer-events-none select-none z-0",
          "shimmer-text text-white/[0.03]"
        )}
      >
        MOMENTUM DIGITAL MOMENTUM DIGITAL
      </motion.div>
    </section>
  );
};