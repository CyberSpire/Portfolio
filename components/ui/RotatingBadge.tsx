import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const RotatingBadge: React.FC = () => {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 2000], [0, 360]);

  return (
    <motion.div 
      style={{ rotate }}
      // 'hidden' hides it on all mobile sizes, 'lg:flex' shows it only on large screens (desktop)
      className="fixed bottom-10 right-10 z-[70] w-32 h-32 md:w-40 md:h-40 hidden lg:flex items-center justify-center pointer-events-none"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full fill-white/10 overflow-visible">
        <path
          id="circlePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          className="fill-none"
        />
        <text className="text-[11px] font-black uppercase tracking-[0.2em] fill-white/60">
          <textPath href="#circlePath">
            • MOMENTUM DIGITAL • ROI DRIVEN WEB • GROWTH FOCUSED • 
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-accent rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)] animate-pulse" />
      </div>
    </motion.div>
  );
};