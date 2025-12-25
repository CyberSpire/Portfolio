
"use client";

import { buttonVariants } from "./shadcn-button";
import { MagnetizeButton } from "./magnetize-button";
import { useMediaQuery } from "../../hooks/use-media-query";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ShieldCheck, Zap, MessageSquare } from "lucide-react";
import React, { useState, useEffect } from "react";

export interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  showToggle?: boolean;
  onPlanSelect?: (planName: string) => void;
}

export function Pricing({
  plans,
  title = "Invest in Results",
  description = "Choose the plan that works for you",
  showToggle = true,
  onPlanSelect
}: PricingProps) {
  const [activeNotification, setActiveNotification] = useState<{plan: string} | null>(null);
  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handlePlanClick = (e: React.MouseEvent, plan: PricingPlan) => {
      e.preventDefault();
      setSelectedPlanName(plan.name);
      setActiveNotification({ plan: plan.name });
      
      if (onPlanSelect) {
          onPlanSelect(plan.name);
      }
      
      setTimeout(() => {
        const targetId = plan.href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setTimeout(() => setSelectedPlanName(null), 2000);
      }, 1000);
  };

  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => setActiveNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const planGradients: Record<string, string> = {
    "STARTER": "from-blue-400 to-emerald-400",
    "BUSINESS": "from-accent via-amber-400 to-orange-600",
    "GROWTH": "from-primary via-purple-300 to-accent"
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8 mb-16 md:mb-24 relative">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
        >
            <div className="bg-accent/10 border border-accent/30 rounded-full px-6 py-2 backdrop-blur-xl">
                <p className="text-accent font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-2">
                    <ShieldCheck size={14} className="flex-shrink-0" /> 
                    ONE-TIME INVESTMENT. NO RENT.
                </p>
            </div>
        </motion.div>

        <div className="relative">
            <h2 className="text-5xl md:text-[10vw] font-display font-black tracking-tighter leading-[0.85] uppercase italic">
              <span className="text-white">
                INVEST IN
              </span>
              <br />
              <span className="text-outline">
                RESULTS.
              </span>
            </h2>
        </div>
        
        <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-sm">
            <p className="text-muted text-lg md:text-xl font-medium leading-relaxed">
              We build assets, not expenses. Choose a high-performance system designed for your business stage.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto items-stretch mt-8 md:mt-12">
        {plans.map((plan, index) => {
          const isSelected = selectedPlanName === plan.name;
          
          return (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 80,
                damping: 15,
                delay: index * 0.15,
              }}
              whileHover={isDesktop ? { y: -15, transition: { duration: 0.3 } } : {}}
              className={cn(
                "rounded-[2rem] md:rounded-[3rem] border-2 p-6 md:p-10 bg-card/70 backdrop-blur-3xl text-center relative shadow-2xl transition-all duration-500 flex flex-col group",
                plan.isPopular ? "border-accent shadow-accent/20" : "border-white/5 hover:border-white/20",
                plan.isPopular && isDesktop && "scale-105"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent py-1 px-4 rounded-full flex items-center shadow-xl z-20">
                  <Star className="text-white h-3 w-3 fill-current" />
                  <span className="text-white ml-2 font-black text-[10px] uppercase tracking-widest">
                    POPULAR
                  </span>
                </div>
              )}
              
              <div className="flex-1 flex flex-col relative z-10">
                <h3 className={cn(
                    "text-2xl md:text-4xl font-black uppercase tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r",
                    planGradients[plan.name] || "from-white to-muted"
                )}>
                  {plan.name}
                </h3>

                <div className="mb-8 flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">
                      {plan.originalPrice && (
                        <div className="relative mb-1">
                          <span className="text-lg md:text-xl text-muted/40 font-black line-through decoration-accent/40 decoration-2">
                              ${plan.originalPrice}
                          </span>
                        </div>
                      )}
                      <div className="flex items-start justify-center">
                          <span className="text-sm font-black text-accent mt-2 mr-1">$</span>
                          <span className="text-6xl md:text-7xl font-display font-black tracking-tighter text-white leading-none">
                            {plan.price}
                          </span>
                      </div>
                  </div>
                  <p className="text-[10px] leading-5 text-accent mt-3 font-black uppercase tracking-widest border border-accent/20 px-3 py-1 rounded-full bg-accent/5">
                      LIFETIME ASSET
                  </p>
                </div>

                <ul className="mt-4 space-y-4 flex flex-col text-left mb-12">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={cn(
                          "mt-1 p-0.5 rounded-full flex-shrink-0 shadow-sm border border-white/10", 
                          plan.isPopular ? "bg-accent text-white" : "bg-white/10 text-white"
                      )}>
                          <Check className="h-3 w-3" strokeWidth={4} />
                      </div>
                      <span className="text-sm md:text-base text-white font-bold leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <MagnetizeButton
                      onClick={(e) => handlePlanClick(e, plan)}
                      className={cn(
                          "w-full py-6 md:py-8 text-base md:text-xl font-black rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300",
                          isSelected 
                            ? "bg-green-600 hover:bg-green-700 shadow-green-500/40 text-white"
                            : plan.isPopular 
                              ? "bg-gradient-to-r from-accent to-amber-600 shadow-accent/40" 
                              : "bg-white text-background hover:bg-accent hover:text-white"
                      )}
                  >
                      <span className="flex items-center gap-3">
                          {isSelected ? "Let's Connect" : plan.buttonText}
                          <Zap size={18} className={cn("fill-current", isSelected && "animate-pulse")} />
                      </span>
                  </MagnetizeButton>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
          {activeNotification && (
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="fixed bottom-24 right-4 left-4 md:left-auto md:right-8 z-[100] max-w-sm"
              >
                  <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-center gap-4 border-4 border-accent">
                      <div className="p-3 rounded-xl bg-accent text-white">
                          <MessageSquare size={24} />
                      </div>
                      <div>
                          <p className="text-gray-900 font-black text-lg leading-tight">Great choice!</p>
                          <p className="text-gray-600 font-bold text-sm mt-1">Ready for <span className="text-accent uppercase">{activeNotification.plan}</span>.</p>
                      </div>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}
