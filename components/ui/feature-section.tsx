"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  const handleStepClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  }

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-center text-gray-900 tracking-tight">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* 
            Mobile: order-2 (below image), vertical list
            Desktop: order-1 (left), vertical list
          */}
          <div className="order-2 md:order-1 flex flex-col gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={cn(
                    "flex items-stretch gap-4 md:gap-6 cursor-pointer rounded-2xl p-4 transition-all duration-300 border w-full",
                    index === currentFeature 
                        ? "bg-white border-blue-100 shadow-lg shadow-blue-50" 
                        : "bg-white/50 border-transparent hover:bg-gray-50 opacity-60 hover:opacity-100"
                )}
                onClick={() => handleStepClick(index)}
              >
                <div className="relative flex flex-col items-center">
                    <motion.div
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 z-10 transition-colors duration-300",
                        index === currentFeature
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-200 text-gray-400",
                    )}
                    >
                    {index < currentFeature ? (
                         <span className="text-lg font-bold">✓</span>
                    ) : (
                        <span className="text-lg font-bold">{index + 1}</span>
                    )}
                    </motion.div>
                    {/* Connecting line */}
                    {index !== features.length - 1 && (
                        <div className="block w-0.5 absolute top-10 bottom-0 bg-gray-100 -z-0"></div>
                    )}
                </div>

                <div className="flex-1 pt-1 pb-4">
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                        {feature.title || feature.step}
                    </h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wide">
                        {feature.step}
                    </span>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed whitespace-normal">
                    {feature.content}
                  </p>
                  
                  {index === currentFeature && (
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-1 bg-blue-600 mt-4 rounded-full"
                     />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl border border-gray-100 bg-gray-100 md:sticky md:top-32",
              imageHeight
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-3xl overflow-hidden"
                      initial={{ y: 20, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -20, opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 p-8 text-white z-20">
                        <span className="text-blue-300 font-bold tracking-widest uppercase text-sm mb-2 block">{feature.step}</span>
                        <h4 className="text-2xl md:text-3xl font-bold">{feature.title}</h4>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}