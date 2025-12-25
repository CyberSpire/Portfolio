
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from "../../lib/utils";

export interface StickyFeature {
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
}

interface StickyFeatureSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  features: StickyFeature[];
}

export function StickyFeatureSection({ title, description, features, eyebrow }: StickyFeatureSectionProps) {
  return (
    <div className="bg-background py-20 md:py-32 overflow-hidden px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
          
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-6 md:gap-12">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                {eyebrow && <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">{eyebrow}</span>}
                <h2 className="text-4xl md:text-8xl font-display font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter uppercase">
                    {title}
                </h2>
            </motion.div>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-sm text-muted font-medium text-base md:text-lg md:text-right leading-tight"
            >
                {description}
            </motion.p>
        </div>

        <div className="w-full relative space-y-8 md:space-y-12">
            {features.map((feature, index) => (
            <StickyCard key={index} feature={feature} index={index} />
            ))}
            <div className="h-10 md:h-20" />
        </div>
      </div>
    </div>
  );
}

const StickyCard: React.FC<{ feature: StickyFeature; index: number }> = ({ feature, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity }}
            className={cn(
                "sticky top-24 md:top-32 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 p-6 md:p-20 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/5 backdrop-blur-3xl overflow-visible",
                feature.bgColor
            )}
        >
            <div className="flex flex-col justify-center gap-4 md:gap-8 order-2 md:order-1 relative z-20">
                <div className="relative overflow-visible">
                    <motion.h3 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl md:text-6xl font-display font-black text-white leading-[1.1] md:leading-none uppercase italic tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                    >
                        {feature.title}
                    </motion.h3>
                </div>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={cn("text-base md:text-xl font-medium leading-relaxed drop-shadow-sm", feature.textColor)}
                >
                    {feature.description}
                </motion.p>
            </div>
            
            <div className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl z-10">
                <motion.img 
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={feature.imageUrl} 
                    alt={feature.title}
                    className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/5 rounded-full blur-[120px] pointer-events-none"
            />
        </motion.div>
    );
}
