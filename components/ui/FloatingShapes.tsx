
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const FloatingShapes: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left Shape */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-[4rem] blur-[100px]"
      />
      
      {/* Mid Right Shape */}
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"
      />
      
      {/* Bottom Left Shape */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute bottom-0 -left-24 w-80 h-80 bg-purple-900/10 rounded-full blur-[80px]"
      />
    </div>
  );
};
