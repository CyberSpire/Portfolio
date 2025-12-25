import React, { useEffect } from 'react';
import { Section } from './ui/Section';
import { Rocket, GraduationCap, Lock, Check } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '../lib/utils';
import { LiquidBackground } from './ui/liquid-background';

interface GridItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  features: string[];
  className?: string;
  delay?: number;
  animationType?: "rotate" | "shake";
  themeColor: "accent" | "primary" | "blue";
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

const GridItem = ({ icon, title, description, features, className, delay = 0, animationType = "rotate", themeColor }: GridItemProps) => {
  const themeStyles = {
    accent: {
      border: "hover:border-accent shadow-accent/10",
      glow: "bg-accent/30",
      iconBg: "bg-accent/20 text-accent",
      iconActive: "group-hover:bg-accent",
      gradient: "from-accent/20 via-transparent to-transparent",
      check: "bg-accent/20 text-accent border-accent/40"
    },
    primary: {
      border: "hover:border-primary shadow-primary/10",
      glow: "bg-primary/30",
      iconBg: "bg-primary/20 text-primary",
      iconActive: "group-hover:bg-primary",
      gradient: "from-primary/20 via-transparent to-transparent",
      check: "bg-primary/20 text-primary border-primary/40"
    },
    blue: {
      border: "hover:border-blue-400 shadow-blue-400/10",
      glow: "bg-blue-400/30",
      iconBg: "bg-blue-400/20 text-blue-300",
      iconActive: "group-hover:bg-blue-400",
      gradient: "from-blue-400/20 via-transparent to-transparent",
      check: "bg-blue-400/20 text-blue-300 border-blue-400/40"
    }
  };

  const style = themeStyles[themeColor];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      style={{ willChange: "transform, opacity" }}
      className={cn(
          "group relative bg-[#1A1A1A] rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-3xl transition-all duration-500 h-full flex flex-col z-10 overflow-hidden", 
          style.border,
          "hover:scale-[1.02]",
          className
      )}
    >
      {/* Dynamic Theme Gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", style.gradient)} />
      
      {/* Animated Top Border */}
      <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300", 
        themeColor === 'accent' ? "from-accent to-orange-400" : 
        themeColor === 'primary' ? "from-primary to-purple-400" : 
        "from-blue-400 to-cyan-300"
      )}></div>

      <div className={cn("mb-8 relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 shadow-xl border border-white/20", style.iconBg, style.iconActive, "group-hover:text-white group-hover:scale-110")}>
        <ProAnimatedIcon animationType={animationType}>
          {React.cloneElement(icon as any, { size: 28 })}
        </ProAnimatedIcon>
        
        <div className={cn("absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity animate-pulse", style.glow)} />
      </div>

      <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-4 tracking-tighter uppercase italic group-hover:text-white transition-colors relative z-10">
        {title}
      </h3>
      
      <p className="text-base text-white leading-relaxed mb-8 flex-grow relative z-10 font-medium group-hover:text-white transition-colors">
        {description}
      </p>

      <div className="space-y-4 pt-8 border-t border-white/20 relative z-10">
        <p className={cn("text-[11px] font-black uppercase tracking-[0.3em] mb-2 drop-shadow-sm", themeColor === 'accent' ? 'text-accent' : themeColor === 'primary' ? 'text-primary' : 'text-blue-300')}>
            Core Benefits
        </p>
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm font-black text-white list-none tracking-tight">
            <div className={cn("mr-3 p-1 rounded-full shrink-0 border-2 shadow-sm", style.check)}>
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
      <div className="absolute inset-x-2 md:inset-x-8 inset-y-0 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] pointer-events-none -z-10" />
      
      <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
        <LiquidBackground className="opacity-40" color="rgba(249, 115, 22, 0.2)" />
      </div>
      
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] opacity-30 -z-10"></div>

      <div className="relative z-10 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20 md:mb-28 max-w-4xl mx-auto px-4 flex flex-col items-center"
        >
          <div className="relative mb-6">
            <h1 className="text-[10px] md:text-xs uppercase font-black text-accent tracking-[0.4em] px-6 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-md shadow-lg">
              Strategic Expertise
            </h1>
          </div>

          <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.9]">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {highlight.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="inline-block text-outline mr-[0.4em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-lg md:text-2xl text-white font-medium leading-relaxed max-w-2xl">
            Everything you need to succeed online, engineered for small business owners who demand <span className="text-accent underline decoration-white/40 underline-offset-8">superior results</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-[1400px] mx-auto px-2">
          <GridItem 
            icon={<Rocket />}
            title="Fast Performance"
            description="Expert websites made to load in less than 2 seconds, helping you keep more customers and rank higher on Google."
            features={["Mobile ready", "Google friendly", "Instant loading"]}
            delay={0.1}
            animationType="rotate"
            themeColor="accent"
          />
          
          <GridItem 
            icon={<Lock />}
            title="Full Ownership"
            description="You own your website 100%. No monthly rent just to keep your site on the internet. Total freedom for your brand."
            features={["One-time pay", "Full code access", "Safe & Private"]}
            delay={0.2}
            animationType="shake"
            themeColor="primary"
          />
          
          <GridItem 
            icon={<GraduationCap />}
            title="Support System"
            description="We stay with you. You get training videos and direct help whenever you need to update your site. Priority access."
            features={["Training videos", "Priority help", "Simple updates"]}
            delay={0.3}
            animationType="shake"
            themeColor="blue"
            className="sm:col-span-2 lg:col-span-1 max-w-lg mx-auto lg:max-w-none"
          />
        </div>
      </div>
    </Section>
  );
};