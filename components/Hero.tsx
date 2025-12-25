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
    hidden: { y: 150, skewY: 10 },
    visible: { y: 0, skewY: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const tagline = (
    <p className="text-white text-xl md:text-2xl font-bold md:font-bold max-w-full md:max-w-md leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
      We engineer high-performance systems for <span className="text-accent">ambitious brands</span>.
    </p>
  );

  const ctaButton = (
    <Button 
      href="#contact" 
      variant="accent" 
      className="rounded-full px-8 md:px-12 py-4 md:py-6 text-base md:text-lg w-full md:w-auto shadow-[0_10px_30px_rgba(249,115,22,0.4)]"
    >
        Start a Project <ArrowDownRight className="ml-2 w-5 h-5" />
    </Button>
  );

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex flex-col justify-center items-center overflow-hidden pt-44 md:pt-20 px-4 md:px-6 bg-background">
      <div className="max-w-[1400px] w-full mx-auto relative z-20 flex flex-col items-center">
        
        {/* Floating Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 md:mt-0 mb-8 md:mb-10 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.3em] text-accent shadow-xl"
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
                    className="text-[14vw] md:text-[10vw] font-display font-black leading-[0.85] uppercase tracking-tighter text-center text-outline italic"
                >
                    Convert Faster.
                </motion.h1>
            </div>
        </div>

        {/* Hero Image Frame */}
        <motion.div 
          style={{ y, scale }}
          className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-card"
        >
            <img 
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2670&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-1000"
                alt="Momentum Digital - Professional Web Design Agency Office"
                decoding="async"
                fetchPriority="high"
            />
            
            {/* Visual Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-90" />
            
            {/* Desktop Only Content Overlay */}
            <div className="hidden md:flex absolute bottom-12 left-12 right-12 flex-row justify-between items-end gap-8 text-left">
                <div className="space-y-4">
                  {tagline}
                </div>
                <div className="flex gap-4 justify-center">
                    {ctaButton}
                </div>
            </div>
        </motion.div>

        {/* Mobile Only Content Below Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:hidden mt-10 w-full max-w-lg space-y-10 px-4 text-center flex flex-col items-center"
        >
          <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm w-full">
            <div className="p-6 rounded-xl bg-background/40">
              {tagline}
            </div>
          </div>
          <div className="w-full">
            {ctaButton}
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Text */}
      <motion.div 
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
        className={cn(
          "absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black whitespace-nowrap pointer-events-none select-none z-0",
          "text-white/[0.02]"
        )}
      >
        MOMENTUM DIGITAL MOMENTUM DIGITAL
      </motion.div>
    </section>
  );
};