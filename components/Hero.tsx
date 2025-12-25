import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  
  const textVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const tagline = (
    <p className="text-white text-base md:text-lg font-medium max-w-full md:max-w-md leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] opacity-90">
      We engineer high-performance systems for <span className="text-accent font-bold">ambitious brands</span>. From architecture to launch, we've got you covered.
    </p>
  );

  const ctaButton = (
    <Button 
      href="#contact" 
      variant="accent" 
      className="rounded-full px-8 md:px-10 py-3.5 md:py-4.5 text-base md:text-lg w-full md:w-auto shadow-[0_10px_30px_rgba(249,115,22,0.4)]"
    >
        Start a Project <ArrowDownRight className="ml-2 w-5 h-5" />
    </Button>
  );

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 md:pt-20 px-4 md:px-6 bg-background">
      <div className="max-w-[1400px] w-full mx-auto relative z-20 flex flex-col items-center">
        
        {/* Floating Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.3em] text-accent shadow-xl"
        >
          Propelling Business Growth
        </motion.div>

        {/* Scaled Titles for Desktop Comfort */}
        <div className="relative mb-8 md:mb-12 flex flex-col items-center w-full">
            <div className="overflow-hidden w-full">
                <motion.h1 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.95] text-white uppercase tracking-tighter text-center"
                >
                    Rank Higher.
                </motion.h1>
            </div>
            <div className="overflow-hidden w-full mt-1">
                <motion.h1 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.95] uppercase tracking-tighter text-center text-outline italic"
                >
                    Convert Faster.
                </motion.h1>
            </div>
        </div>

        {/* Hero Image Frame */}
        <motion.div 
          style={{ y, scale }}
          className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-card"
        >
            <img 
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2670&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-1000"
                alt="Momentum Web Agency Office"
                decoding="async"
                fetchPriority="high"
            />
            
            {/* Visual Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-90" />
            
            {/* Desktop Only Content Overlay */}
            <div className="hidden md:flex absolute bottom-8 left-10 right-10 flex-row justify-between items-end gap-8 text-left">
                <div className="space-y-3">
                  {tagline}
                </div>
                <div className="flex gap-4">
                    {ctaButton}
                </div>
            </div>
        </motion.div>

        {/* Mobile Only Content Below Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:hidden mt-8 w-full max-w-lg space-y-6 px-4 text-center flex flex-col items-center"
        >
          {tagline}
          {ctaButton}
        </motion.div>
      </div>

      {/* Background Decoration - Scaled down */}
      <motion.div 
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className={cn(
          "absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-black whitespace-nowrap pointer-events-none select-none z-0",
          "text-white/[0.01]"
        )}
      >
        MOMENTUM WEB MOMENTUM WEB
      </motion.div>
    </section>
  );
};