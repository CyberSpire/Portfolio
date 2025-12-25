import React from 'react';
import { Section } from './ui/Section';
import { FeatureSteps } from './ui/feature-section';
import { motion, Variants } from 'framer-motion';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export const Process: React.FC = () => {
  const steps = [
    {
      step: "Day 1",
      title: "First Chat",
      content: "We'll discuss your business, goals, and what you need from your website in a friendly 30-minute call. No technical jargon, just a clear plan forward.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
    },
    {
      step: "Days 2-5",
      title: "The Plan",
      content: "We create a clear map of your new website. We define exactly how it will work, what it will say, and how it will bring in more customers for you.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop"
    },
    {
      step: "Days 6-9",
      title: "Building Site",
      content: "I build your custom website while keeping you updated. You'll see progress and can ask questions anytime. We focus on making it look professional and load fast.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop"
    },
    {
      step: "Day 10",
      title: "Go Live",
      content: "Your website goes live! You receive a training video, written guide, and 30 days of support to ensure you're confident managing your new asset.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  return (
    <Section id="process" className="relative z-10 overflow-hidden">
       <motion.div
         variants={fadeIn}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, amount: 0.2 }}
       >
         <div className="flex flex-col items-center justify-center pt-24 pb-2">
            <h1 className="text-xl uppercase font-black text-accent tracking-widest">Our Process</h1>
            <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-accent to-amber-400 mt-2 mb-6 shadow-[0_0_15px_#F97316]"></div>
         </div>
         <FeatureSteps 
            features={steps}
            title={
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="block max-w-4xl mx-auto leading-tight text-white pr-4 md:pr-6"
                >
                    From Concept to Launch in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 font-black">10 Days</span>
                </motion.span>
            }
            autoPlayInterval={5000}
            imageHeight="h-[400px] md:h-[600px]"
         />
       </motion.div>
       
       <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />
    </Section>
  );
};