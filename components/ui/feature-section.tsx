"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string | React.ReactNode
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);

  useEffect(() => {
    if (!isInView || window.innerWidth < 1024) {
      setProgress(0);
      return;
    }

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval, isInView])

  const handleStepClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  }

  const nextStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentFeature((prev) => (prev + 1) % features.length);
    setProgress(0);
  }

  const prevStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
    setProgress(0);
  }

  return (
    <div ref={containerRef} className={cn("p-4 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-8xl font-display font-black mb-12 md:mb-20 text-center text-white tracking-tighter uppercase italic leading-[0.9]">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start">
          <div className="flex flex-col gap-5 md:gap-6 order-2 lg:order-1">
            {features.map((feature, index) => {
              const isActive = index === currentFeature;
              return (
                <motion.div
                  key={index}
                  className={cn(
                      "flex flex-col gap-4 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 border relative overflow-hidden cursor-pointer",
                      "bg-white/[0.05] border-white/10 lg:opacity-40 lg:border-white/5",
                      isActive && "border-accent lg:bg-white/[0.05] lg:border-accent lg:shadow-[0_20px_50px_rgba(249,115,22,0.1)] lg:scale-[1.02] lg:opacity-100"
                  )}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className={cn(
                          "text-[9px] md:text-xs font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-[0.2em] shrink-0 transition-colors",
                          "bg-accent text-white",
                          !isActive && "lg:bg-white/5 lg:text-muted"
                      )}>
                          {feature.step}
                      </span>
                      <h3 className={cn(
                        "text-lg md:text-2xl font-display font-black text-white uppercase italic tracking-tight transition-colors",
                        "text-white",
                        !isActive && "lg:text-muted"
                      )}>
                          {feature.title}
                      </h3>
                    </div>

                    <div className="lg:hidden mt-4">
                        <p className="text-sm md:text-lg text-muted leading-relaxed font-medium">
                            {feature.content}
                        </p>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1, 
                            marginTop: 16,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0, 
                            marginTop: 0,
                            transition: { duration: 0.3, ease: "easeIn" }
                          }}
                          className="hidden lg:block overflow-hidden"
                        >
                          <p className="text-sm md:text-lg text-muted leading-relaxed font-medium">
                            {feature.content}
                          </p>
                          
                          <div className="mt-6 md:mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  className="h-full bg-accent shadow-[0_0_10px_#F97316]"
                              />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div
            className={cn(
              "relative h-[300px] md:h-[600px] lg:h-[700px] perspective-lg order-1 lg:order-2 group/image",
              imageHeight
            )}
          >
            <motion.div 
              style={{ rotateY, rotateX }}
              className="w-full h-full relative"
            >
                {/* Step Counter Badge */}
                <div className="absolute top-6 right-6 z-30 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                  Step {currentFeature + 1} of {features.length}
                </div>

                {/* Manual Navigation Arrows */}
                <button 
                  onClick={prevStep}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-lg border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 md:opacity-0 md:group-hover/image:opacity-100"
                  aria-label="Previous step"
                >
                  <ChevronLeft size={24} />
                </button>

                <button 
                  onClick={nextStep}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-lg border border-white/10 text-white hover:bg-accent hover:border-accent transition-all duration-300 md:opacity-0 md:group-hover/image:opacity-100"
                  aria-label="Next step"
                >
                  <ChevronRight size={24} />
                </button>

                <AnimatePresence mode="wait">
                {features.map(
                    (feature, index) =>
                    index === currentFeature && (
                        <motion.div
                        key={index}
                        className="absolute inset-0 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-card"
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 1.1, x: -20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                        <img
                            src={feature.image}
                            alt={`${feature.step}: ${feature.title} - Momentum Digital Web Development Process`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute bottom-10 left-10 right-10 text-white z-20">
                            <span className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-3 block">{feature.step}</span>
                            <h4 className="text-3xl md:text-5xl font-display font-black tracking-tighter uppercase italic">{feature.title}</h4>
                        </div>
                        </motion.div>
                    ),
                )}
                </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
