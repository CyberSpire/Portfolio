import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

export interface StickyFeature {
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
}

interface StickyFeatureSectionProps {
  title: string;
  description: string;
  features: StickyFeature[];
}

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};


// --- Header Component ---
const AnimatedHeader = ({ title, description }: { title: string, description: string }) => {
    const [headerRef, headerInView] = useScrollAnimation();
    const [pRef, pInView] = useScrollAnimation();

    return (
        <div className="text-center max-w-3xl mx-auto mb-20 px-4">
            <h2 
                ref={headerRef as React.RefObject<HTMLHeadingElement>}
                className={cn(
                    "text-3xl md:text-5xl font-extrabold transition-all duration-700 ease-out text-gray-900 tracking-tight",
                    headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
            >
                {title}
            </h2>
            <p 
                ref={pRef as React.RefObject<HTMLParagraphElement>}
                className={cn(
                    "text-lg text-gray-600 mt-6 transition-all duration-700 ease-out delay-200 max-w-2xl mx-auto leading-relaxed",
                    pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
            >
                {description}
            </p>
        </div>
    );
};

export function StickyFeatureSection({ title, description, features }: StickyFeatureSectionProps) {
  return (
    <div className="bg-white font-sans py-20 md:py-32 overflow-hidden">
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
            
            <AnimatedHeader title={title} description={description} />

            <div className="w-full relative">
              {features.map((feature, index) => (
                <div
                    key={index}
                    className={cn(
                        "grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 p-8 md:p-12 rounded-3xl mb-12 sticky top-24 md:top-32 shadow-xl border border-white/20 transition-transform duration-500",
                        feature.bgColor
                    )}
                >
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h3 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">{feature.title}</h3>
                    <p className={cn("text-lg md:text-xl leading-relaxed", feature.textColor)}>{feature.description}</p>
                  </div>
                  
                  <div className="order-1 md:order-2 relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <img 
                        src={feature.imageUrl} 
                        alt={feature.title}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
              {/* Spacer reduced to prevent excessive gap before Pricing section */}
              <div className="h-12" />
            </div>
        </div>
      </div>
    </div>
  );
}