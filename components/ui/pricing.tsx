"use client";

import { buttonVariants } from "@/components/ui/shadcn-button";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import React, { useState } from "react";

export interface PricingPlan {
  name: string;
  price: string;
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
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you",
  showToggle = true,
  onPlanSelect
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
  };

  const handlePlanClick = (e: React.MouseEvent, plan: PricingPlan) => {
      if (onPlanSelect) {
          onPlanSelect(plan.name);
      }
      
      if (plan.href.startsWith('#')) {
          e.preventDefault();
          const targetId = plan.href.replace('#', '');
          setTimeout(() => {
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
          }, 100);
      }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {showToggle && (
        <div className="flex justify-center mb-10">
            <label className="relative inline-flex items-center cursor-pointer">
            <Label>
                <Switch
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="relative"
                />
            </Label>
            </label>
            <span className="ml-2 font-semibold">
            Annual billing <span className="text-primary">(Save 20%)</span>
            </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    scale: plan.isPopular ? 1.05 : 1,
                  }
                : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.1,
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-white text-center lg:flex lg:flex-col lg:justify-center relative shadow-sm hover:shadow-xl transition-shadow duration-300`,
              plan.isPopular ? "border-primary border-2 z-10" : "border-border",
              "flex flex-col",
              !plan.isPopular && "mt-5",
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center shadow-md">
                <Star className="text-white h-4 w-4 fill-current" />
                <span className="text-white ml-1 font-sans font-bold text-xs uppercase tracking-wider">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-bold text-gray-500 uppercase tracking-wider">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                  ${isMonthly ? plan.price : plan.yearlyPrice}
                </span>
                {plan.period && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-400">
                     {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-gray-400 mt-1 font-medium">
                {isMonthly ? "One-time payment" : "Billed annually"}
              </p>

              <ul className="mt-8 space-y-3 flex flex-col text-left mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={cn("mt-1 p-0.5 rounded-full flex-shrink-0", plan.isPopular ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600")}>
                        <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <hr className="w-full my-6 border-gray-100" />
                
                <MagnetizeButton
                    onClick={(e) => handlePlanClick(e, plan)}
                    className={cn(
                        "w-full py-6 text-base font-bold rounded-xl",
                        plan.isPopular 
                         ? "bg-blue-600 hover:bg-blue-700" 
                         : "bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50 hover:border-blue-600"
                    )}
                >
                    {plan.buttonText}
                </MagnetizeButton>
                
                <p className="mt-4 text-xs leading-relaxed text-gray-500 font-medium">
                    {plan.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}