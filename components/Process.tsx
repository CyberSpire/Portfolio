import React from 'react';
import { Section } from './ui/Section';
import { FeatureSteps } from './ui/feature-section';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export const Process: React.FC = () => {
  const steps = [
    {
      step: "Day 0",
      title: "Free Consultation",
      content: "We'll discuss your business, goals, and what you need from your website in a friendly 30-minute call. No technical jargon, just a clear plan forward.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
    },
    {
      step: "Days 1-7",
      title: "Design & Build",
      content: "I build your custom website while keeping you updated every 2-3 days. You'll see progress and can ask questions anytime. We focus on speed and quality.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop"
    },
    {
      step: "Days 8-9",
      title: "Review & Refine",
      content: "You review everything and tell me what you'd like adjusted. Two rounds of changes are included to make sure it's perfect before the world sees it.",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop"
    },
    {
      step: "Day 10",
      title: "Launch & Train",
      content: "Your website goes live! You receive a training video, written guide, and 30 days of support to ensure you're confident managing your new asset.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
    }
  ];

  return (
    <Section id="process" className="bg-gray-50 py-0 relative z-10">
       <motion.div
         variants={fadeIn}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
       >
         <FeatureSteps 
            features={steps}
            title="From Concept to Launch in 10 Days"
            autoPlayInterval={5000}
            imageHeight="h-[400px] md:h-[600px]"
         />
       </motion.div>
    </Section>
  );
};