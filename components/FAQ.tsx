import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FAQItem } from '../types';
import { Button } from './ui/Button';

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
      question: "What makes Momentum Web different from other agencies?",
      answer: "Most agencies focus only on design. Momentum Web focuses on growth. We combine clean design, fast loading speeds, and SEO basics with conversion-focused layouts. Your website won't just look good — it will bring results."
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
      answer: "Yes! We include 1 year of domain registration and setup lifetime free hosting on Vercel (enterprise-grade performance). You get full ownership after delivery with no hidden monthly charges."
    },
    {
      question: "Can I manage the website myself after delivery?",
      answer: "Absolutely. We provide an easy-to-manage structure, a personal training video, and 30 days of support. You are never locked in and can handle updates yourself."
    },
    {
      question: "Is Momentum Web suitable for small businesses?",
      answer: "Yes! We specialize in local businesses, startups, personal brands, and coaches. If you want growth, not just a digital brochure, we’re the perfect fit for you."
    },
    {
      question: "How long does it take to build a website?",
      answer: "We move fast without compromising quality. Typically, a Landing Page takes 3–5 days, and a full Business Website takes 7–10 days."
    }
  ];

  return (
    <Section id="faq" className="bg-white">
      <motion.div 
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-16 px-4"
      >
        {/* Styled Header matching About section */}
        <h1 className="text-xl uppercase font-bold text-indigo-600 tracking-wider">FAQ</h1>
        <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-purple-400 mt-2 mb-8"></div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Ambitious Owners</span> Ask
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Everything you need to know about how we help your business grow online.
        </p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto space-y-4"
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
        className="text-center mt-16"
      >
        <Button href="#contact" className="px-8 py-4 shadow-xl shadow-blue-100 text-lg">Schedule Your Free Call</Button>
      </motion.div>
    </Section>
  );
};

const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-blue-300 shadow-lg ring-1 ring-blue-100' : 'border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center p-6 text-left focus:outline-none transition-colors ${isOpen ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
      >
        <span className={`font-bold pr-8 text-lg transition-colors ${isOpen ? 'text-blue-800' : 'text-gray-900'}`}>{item.question}</span>
        <motion.div 
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-full p-1.5 flex-shrink-0 ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
        >
            <Plus size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed bg-blue-50/50 text-base border-t border-blue-100/50">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};