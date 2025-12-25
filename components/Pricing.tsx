import React from 'react';
import { Section } from './ui/Section';
import { Pricing as PricingComponent, PricingPlan } from './ui/pricing';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: "STARTER",
      price: "199",
      originalPrice: "299",
      yearlyPrice: "199",
      period: "",
      features: [
        "1-3 Professional Pages",
        "Mobile-Responsive Design",
        "Contact Form Setup",
        "Basic SEO Optimization",
        "Domain Registration (1 yr)",
        "FREE Lifetime Hosting",
        "2 Weeks Support"
      ],
      description: "Perfect for individuals and small service businesses getting started.",
      buttonText: "Select Starter",
      href: "#contact",
      isPopular: false,
    },
    {
      name: "BUSINESS",
      price: "399",
      originalPrice: "599",
      yearlyPrice: "399",
      period: "",
      features: [
        "5-7 Custom Pages",
        "Premium Design",
        "Google Maps Integration",
        "Complete SEO Optimization",
        "Google Business Profile",
        "Social Media Integration",
        "Comprehensive Training",
        "30 Days Support"
      ],
      description: "Everything a growing local business needs to succeed online.",
      buttonText: "Select Business",
      href: "#contact",
      isPopular: true,
    },
    {
      name: "GROWTH",
      price: "999",
      originalPrice: "1499",
      yearlyPrice: "999",
      period: "",
      features: [
        "10+ Custom Pages",
        "E-commerce Ready",
        "Online Booking System",
        "Email Marketing Setup",
        "Advanced SEO & Analytics",
        "Content Management System",
        "Payment Processing",
        "60 Days Priority Support"
      ],
      description: "For businesses ready to scale with advanced features.",
      buttonText: "Select Growth",
      href: "#contact",
      isPopular: false,
    },
  ];

  const handlePlanSelect = (planName: string) => {
    const mapping: Record<string, string> = {
        "STARTER": "Starter Package ($199)",
        "BUSINESS": "Business Package ($399)",
        "GROWTH": "Growth Package ($999)"
    };
    
    const packageName = mapping[planName];
    if (packageName) {
        const event = new CustomEvent('package-selected', { detail: { package: packageName } });
        window.dispatchEvent(event);
    }
  };

  return (
    <Section id="pricing" className="overflow-visible px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex justify-center mb-8">
            <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-flex items-center gap-3 bg-accent text-white px-6 py-2.5 rounded-full border-2 border-white/20 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
            >
                <Sparkles size={18} className="animate-pulse" />
                <span className="text-xs md:text-sm font-black uppercase tracking-widest">Limited Time Launch Offer</span>
            </motion.div>
        </div>
        
        <PricingComponent 
            plans={plans}
            title="Invest in Results"
            description="We build assets, not expenses. Choose a high-performance system designed for your business stage."
            showToggle={false}
            onPlanSelect={handlePlanSelect}
        />
      </motion.div>

      {/* Guaranteed Ownership Banner: Significant margin added as requested */}
      <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mt-32 md:mt-48"
      >
          <div className="bg-[#111111] rounded-[2.5rem] p-10 md:p-16 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-primary opacity-50" />
              
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-8 space-y-6">
                      <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full border border-accent/20">
                          <Lock size={14} className="fill-current" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Ownership Guaranteed</span>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                          Stop Renting. <br /> <span className="text-outline">Start Owning.</span>
                      </h3>
                      <p className="text-muted text-lg font-medium leading-relaxed max-w-2xl">
                          Agencies often charge monthly fees just to keep your site online. We don't. You get 100% of the code. No lock-ins, just results.
                      </p>
                  </div>
                  
                  <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-6 lg:border-l border-white/10 lg:pl-12 pt-10 lg:pt-0">
                      <div className="flex -space-x-4">
                          {[1, 2, 3].map((i) => (
                              <div key={i} className="w-14 h-14 rounded-full border-2 border-background bg-card flex items-center justify-center text-accent/60 shadow-xl">
                                  <ShieldCheck size={24} />
                              </div>
                          ))}
                      </div>
                      <div className="text-center lg:text-right">
                          <p className="text-white font-black text-2xl tracking-tighter uppercase italic">LIFETIME ASSET</p>
                          <p className="text-muted text-[10px] font-black uppercase tracking-[0.3em] mt-1">Ready for Success</p>
                      </div>
                  </div>
              </div>
          </div>
      </motion.div>
    </Section>
  );
};
