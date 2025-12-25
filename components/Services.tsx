
import React, { useEffect } from 'react';
import { Section } from './ui/Section';
import { Rocket, GraduationCap, Lock, Check } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../lib/utils';
import { LiquidBackground } from './ui/liquid-background';

// Refined GridItemProps
interface GridItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  features: string[];
  className?: string;
  delay?: number;
  animationType?: "rotate" | "shake";
}

const ProAnimatedIcon = ({ children, animationType = "rotate" }: { children?: React.ReactNode, animationType?: "rotate" | "shake" }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    let active = true;
    const sequence = async () => {
      while (active) {
        await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
        if (!active) break;
        
        if (animationType === "rotate") {
          await controls.start({
            rotateY: [0, 360],
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
          });
        } else {
          // Shake animation
          await controls.start({
            x: [0, -5, 5, -5, 5, 0],
            y: [0, -1, 1, -1, 1, 0],
            opacity: 1,
            transition: { duration: 0.6, ease: "linear" }
          });
        }
      }
    };
    
    sequence();
    return () => { active = false; };
  }, [controls, animationType]);

  return (
    <motion.div 
      animate={controls}
      initial={{ opacity: 1, rotateY: 0, rotate: 0, x: 0, y: 0 }}
      whileHover={{ scale: 1.2, rotate: animationType === "rotate" ? 10 : 0 }}
      className="relative flex items-center justify-center transition-all duration-300 z-10"
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
};

const GridItem = ({ icon, title, description, features, className, delay = 0, animationType = "rotate" }: GridItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={cn(
          "group relative bg-card/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-white/5 shadow-xl transition-all duration-500 h-full flex flex-col z-10 overflow-hidden", 
          "hover:border-accent/40 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)]",
          className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="mb-8 relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 text-accent group-hover:bg-accent group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm border border-white/10 group-hover:border-accent">
        <ProAnimatedIcon animationType={animationType}>
          {React.cloneElement(icon as any, { size: 28 })}
        </ProAnimatedIcon>
        
        <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
      </div>

      <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-4 tracking-tighter uppercase italic group-hover:text-accent transition-colors relative z-10">
        {title}
      </h3>
      
      <p className="text-base text-muted/80 leading-relaxed mb-8 flex-grow relative z-10 font-medium">
        {description}
      </p>

      <div className="space-y-4 pt-8 border-t border-white/5 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/50 mb-2">Core Benefits</p>
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm font-bold text-white/90 list-none tracking-tight">
            <div className="mr-3 p-1 rounded-full bg-accent/10 text-accent shrink-0 border border-accent/20">
                <Check size={12} strokeWidth={4} />
            </div>
            {feature}
          </li>
        ))}
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const words = "Services Built For".split(" ");
  const highlight = "High Growth.".split(" ");

  return (
    <Section id="services" className="relative overflow-visible px-4">
      <div className="absolute inset-x-2 md:inset-x-8 inset-y-0 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)] pointer-events-none -z-10" />
      
      <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
        <LiquidBackground className="opacity-40" color="rgba(249, 115, 22, 0.2)" />
      </div>
      
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] opacity-30 -z-10"></div>

      <div className="relative z-10 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-28 max-w-4xl mx-auto px-4 flex flex-col items-center"
        >
          <div className="relative mb-6">
            <h1 className="text-[10px] md:text-xs uppercase font-black text-accent tracking-[0.4em] px-6 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md shadow-lg">
              Strategic Expertise
            </h1>
          </div>

          <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.9]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {highlight.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: "spring" }}
                className="inline-block text-outline mr-[0.4em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-lg md:text-2xl text-muted font-medium leading-relaxed max-w-2xl">
            Everything you need to succeed online, engineered for small business owners who demand <span className="text-white">superior performance</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-[1400px] mx-auto px-2">
          <GridItem 
            icon={<Rocket />}
            title="High Speed Websites"
            description="Ultra-fast websites engineered to dominate search rankings and transform anonymous visitors into loyal, paying customers."
            features={["Mobile-responsive architecture", "Precision SEO engineering", "Instant-load optimization"]}
            delay={0.1}
            animationType="rotate"
          />
          
          <GridItem 
            icon={<Lock />}
            title="Zero-Rent Ownership"
            description="Break free from agency dependency. You invest once and maintain 100% legal ownership of your digital assets forever."
            features={["No recurring platform fees", "Total source code access", "Industrial-grade security"]}
            delay={0.2}
            animationType="shake"
          />
          
          <GridItem 
            icon={<GraduationCap />}
            title="Lifetime Support"
            description="We don't leave you stranded. Receive elite training systems and dedicated priority support to ensure your long-term success."
            features={["Exclusive video walkthroughs", "Rapid-response priority care", "Simplified management systems"]}
            delay={0.3}
            animationType="shake"
            className="sm:col-span-2 lg:col-span-1 max-w-lg mx-auto lg:max-w-none"
          />
        </div>
      </div>
    </Section>
  );
};
