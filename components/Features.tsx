import React from 'react';
import { StickyFeatureSection, StickyFeature } from './ui/sticky-scroll-cards-section';

export const Features: React.FC = () => {
  const features: StickyFeature[] = [
    {
      title: "Built for Speed & Performance",
      description: "We don't use slow website builders. We code with Next.js and Tailwind CSS—the same tech stack used by Netflix and TikTok. Your site will load instantly, keeping visitors engaged.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900/80"
    },
    {
      title: "Mobile-First by Default",
      description: "Over 70% of your customers browse on their phones. We design for the smallest screen first, ensuring your business looks professional on every device, every time.",
      imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
      bgColor: "bg-purple-50",
      textColor: "text-purple-900/80"
    },
    {
      title: "SEO Baked In, Not Tacked On",
      description: "A beautiful website is useless if no one sees it. We structure your site to be loved by Google, with proper metadata, sitemaps, and semantic HTML included standard.",
      imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2669&auto=format&fit=crop",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-900/80"
    },
    {
      title: "You Own Everything. No Strings.",
      description: "Unlike other agencies that trap you with monthly fees, we hand over the keys. You get full ownership of your code, content, and design. No hidden subscriptions.",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700"
    },
  ];

  return (
    <StickyFeatureSection 
        title="Why Choose Momentum Web?" 
        description="We don't just build websites; we build digital assets that grow your business. Here is how we differ from the competition."
        features={features}
    />
  );
};