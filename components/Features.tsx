import React from 'react';
import { StickyFeatureSection, StickyFeature } from './ui/sticky-scroll-cards-section';

export const Features: React.FC = () => {
  const features: StickyFeature[] = [
    {
      title: "Fast Websites that Don't Keep People Waiting",
      description: "Most people leave a website if it's slow. We build yours to load instantly, so you never lose a customer who's tired of waiting for a page to open.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      bgColor: "bg-orange-950/20 border-orange-900/50",
      textColor: "text-orange-100"
    },
    {
      title: "Works Perfectly on Every Phone",
      description: "Most of your customers use their phones to find you. We make sure your website looks professional and is easy to use on every smartphone and tablet.",
      imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
      bgColor: "bg-sky-950/20 border-sky-900/50",
      textColor: "text-sky-100"
    },
    {
      title: "Helping Local Customers Find You",
      description: "We set up your website so Google understands what your business does. This helps you show up when local people search for the services you provide.",
      imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2669&auto=format&fit=crop",
      bgColor: "bg-rose-950/20 border-rose-900/50",
      textColor: "text-rose-100"
    },
    {
      title: "You Own Your Website Forever",
      description: "Unlike other companies, we don't charge you a monthly 'rent' just to keep your site online. You pay once, and the website is 100% yours forever. Total freedom for your brand.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
      bgColor: "bg-card border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
      textColor: "text-white font-black text-shadow-lg"
    },
  ];

  return (
    <StickyFeatureSection 
        eyebrow="Why Momentum"
        title="Why Business Owners Choose Us" 
        description="We don't just build websites; we build long-term assets for your business. Here is how we ensure your digital success."
        features={features}
    />
  );
};