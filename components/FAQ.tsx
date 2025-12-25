
import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Plus, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FAQItem } from '../types';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "How can a website help me grow customers?",
      answer: "A website works as your 24/7 sales person. We design websites that attract the right audience, build trust in the first few seconds, and guide visitors to take action—whether that's calling you, contacting you on WhatsApp, or booking a service."
    },
    {
      question: "What makes Momentum Digital different?",
      answer: "Most agencies focus only on design. We focus on growth. We combine clean design, fast loading speeds, and SEO basics with conversion-focused layouts. Your website won't just look good — it will bring results."
    },
    {
      question: "How do you convert visitors into customers?",
      answer: "We use proven strategies like clear call-to-action buttons, simple user flows, trust elements (reviews, stats, guarantees), and optimized contact forms. Every page is designed with one goal: conversion."
    },
    {
      question: "Will my website appear on Google?",
      answer: "Yes. We build SEO-friendly websites with proper headings, fast loading speeds, mobile optimization, and basic on-page SEO setup. This helps your website rank better over time so customers can find you."
    },
    {
      question: "Do you provide hosting and domain?",
      answer: "Yes! We include 1 year of domain registration and setup lifetime free hosting on Vercel. You get full ownership after delivery with no hidden monthly charges."
    },
    {
      question: "Can I manage the website myself?",
      answer: "Absolutely. We provide an easy-to-manage structure, a personal training video, and 30 days of support. You are never locked in and can handle updates yourself."
    }
  ];

  return (
    <Section id="faq" className="px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20 text-center"
        >
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Intelligence Hub</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                Strategic <br /> <span className="text-outline">Insights.</span>
            </h2>
            <p className="text-muted text-lg md:text-xl font-medium mt-8 max-w-2xl mx-auto">
                Everything you need to know about how we engineer high-performance growth systems for your business.
            </p>
        </motion.div>

        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
        >
            {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemFadeIn}>
                <AccordionItem item={faq} />
            </motion.div>
            ))}
        </motion.div>

        <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-20"
        >
            <div className="p-10 rounded-[2.5rem] bg-card/40 border border-white/5 backdrop-blur-3xl inline-block">
                <p className="text-white font-black text-xl mb-6 italic uppercase">Still have questions?</p>
                <Button href="#contact" className="px-10 py-5 shadow-2xl rounded-full">Initiate Consultation</Button>
            </div>
        </motion.div>
      </div>
    </Section>
  );
};

const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(
        "group rounded-[2rem] border transition-all duration-500 overflow-hidden",
        isOpen 
            ? "bg-accent/5 border-accent shadow-[0_0_30px_rgba(249,115,22,0.1)]" 
            : "bg-card/40 border-white/5 hover:border-white/20"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-8 md:p-10 text-left focus:outline-none"
      >
        <span className={cn(
            "font-black text-lg md:text-xl uppercase italic tracking-tight transition-colors pr-8",
            isOpen ? "text-accent" : "text-white group-hover:text-accent"
        )}>
            {item.question}
        </span>
        <motion.div 
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border",
                isOpen ? "bg-accent text-white border-accent" : "bg-white/5 text-muted border-white/10"
            )}
        >
            <Plus size={20} strokeWidth={3} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 md:px-10 pb-10 text-muted font-medium text-base md:text-lg leading-relaxed border-t border-white/5 pt-6">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
