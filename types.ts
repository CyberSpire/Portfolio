export interface Project {
  id: number;
  title: string;
  industry: string;
  description: string;
  tech: string;
  imageUrl: string;
  demoUrl: string;
}

export interface Service {
  title: string;
  description: string;
  icon: any;
  features: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  delivery: string;
  bestFor: string[];
  recommended?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}