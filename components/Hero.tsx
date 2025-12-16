import React from 'react';
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Button } from './ui/Button';
import { Zap, DollarSign, Search, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

// Momentum Web Feature mapping
const features = [
  {
    icon: Zap,
    title: "7-10 Day Delivery",
    description: "Ultra-fast turnaround times for quick launches.",
  },
  {
    icon: DollarSign,
    title: "One-Time Payment",
    description: "No monthly fees. You own your website completely.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built-in optimization to help you rank on Google.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    description: "Perfect experience on every device, every time.",
  },
];

export const Hero: React.FC = () => {
  return (
    <HeroGeometric 
      badge="Growth-Focused Web Agency"
      title1="Turn Visitors"
      title2="Into Customers"
      description="Websites that don’t just look good — they grow your business. We build fast, SEO-optimized customer-generating systems for ambitious brands."
    >
      <div className="flex flex-col items-center space-y-12">
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
             <Button 
                href="#portfolio" 
                variant="white"
                className="w-full sm:w-auto text-sm px-8 py-3.5 rounded-xl bg-white text-black border border-white/10 hover:bg-blue-50 shadow-none transition-colors"
              >
                View My Work
              </Button>
              <Button 
                href="#contact" 
                variant="outline"
                className="w-full sm:w-auto text-sm px-8 py-3.5 rounded-xl bg-transparent text-white border-2 border-white/20 hover:bg-white/10 hover:border-white shadow-none"
              >
                Get Free Quote
              </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full px-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ 
                y: -5, 
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.4)" 
              }}
              className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 flex flex-col justify-start items-start text-left hover:bg-white/10 transition-colors h-full"
            >
              <div className="bg-white/10 p-3 rounded-xl mb-4 text-blue-300">
                <feature.icon size={26} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-base text-zinc-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </HeroGeometric>
  );
};