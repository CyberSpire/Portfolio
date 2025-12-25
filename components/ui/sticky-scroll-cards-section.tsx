
import React, { useRef } from 'react';
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
  // Helper to chunk features into pairs for desktop (2 cards per screen)
  const chunkedFeatures = [];
  for (let i = 0; i < features.length; i += 2) {
    chunkedFeatures.push(features.slice(i, i + 2));
  }

  return (
    <div className="bg-background py-20 md:py-32 overflow-hidden px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
          
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-12">
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
            {/* Desktop: Grouped by pairs, Mobile: Still show individual/stacked if preferred, 
                but we'll use the chunked approach for both for consistency in the "2 cards" request. */}
            {chunkedFeatures.map((group, index) => (
              <StickyRow key={index} features={group} index={index} />
            ))}
            <div className="h-10 md:h-20" />
        </div>
      </div>
    </div>
  );
}

const StickyRow: React.FC<{ features: StickyFeature[]; index: number }> = ({ features, index }) => {
    const rowRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"]
    });

    // Scaling effect for the entire row as it scrolls
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={rowRef}
            style={{ scale, opacity }}
            className="sticky top-24 md:top-32 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pointer-events-none"
        >
            {features.map((feature, fIdx) => (
                <div 
                    key={fIdx} 
                    className={cn(
                        "pointer-events-auto relative flex flex-col p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/5 backdrop-blur-3xl overflow-hidden group",
                        feature.bgColor
                    )}
                >
                    <div className="relative aspect-[16/9] md:aspect-[1.5/1] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl z-10 mb-6 md:mb-10">
                        <motion.img 
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={feature.imageUrl} 
                            alt={feature.title}
                            className="w-full h-full object-cover transition-all duration-700"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-col gap-3 md:gap-5 relative z-20">
                        <h3 className="text-2xl md:text-4xl font-display font-black text-white leading-tight uppercase italic tracking-tighter drop-shadow-md">
                            {feature.title}
                        </h3>
                        <p className={cn("text-sm md:text-lg font-medium leading-relaxed opacity-90", feature.textColor)}>
                            {feature.description}
                        </p>
                    </div>

                    {/* Decorative Background Pulse */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
                </div>
            ))}
        </motion.div>
    );
}
