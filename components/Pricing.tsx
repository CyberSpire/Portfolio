import React from 'react';
import { Section } from './ui/Section';
import { Pricing as PricingComponent, PricingPlan } from './ui/pricing';
import { CreditCard, ShieldCheck, Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: "STARTER",
      price: "199",
      yearlyPrice: "199", // Same price as no yearly toggle
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
      yearlyPrice: "999",
      period: "",
      features: [
        "10+ Custom Pages",
        "E-commerce (20 products)",
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
    // Map uppercase plan names back to the format Contact form expects
    const mapping: Record<string, string> = {
        "STARTER": "Starter Package ($199)",
        "BUSINESS": "Business Package ($399)",
        "GROWTH": "Growth Package ($999)"
    };
    
    const packageName = mapping[planName];
    if (packageName) {
        // Dispatch event to notify Contact form
        const event = new CustomEvent('package-selected', { detail: { package: packageName } });
        window.dispatchEvent(event);
    }
  };

  return (
    <Section id="pricing" className="bg-gray-50/50">
      <PricingComponent 
        plans={plans}
        title="Transparent Pricing"
        description="One-time investment. No monthly fees. You own everything."
        showToggle={false}
        onPlanSelect={handlePlanSelect}
      />

      <div className="mt-12">
        <div className="relative max-w-4xl mx-auto bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-blue-100 overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="flex-shrink-0 bg-blue-50 p-4 rounded-full text-blue-600">
                <CreditCard size={40} />
              </div>
              
              <div className="text-center md:text-left flex-grow">
                 <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center md:justify-start gap-2">
                    Flexible Payment Structure
                 </h3>
                 <p className="text-lg text-gray-600 font-medium">
                    <span className="text-blue-600 font-bold">50% deposit</span> to start project  •  <span className="text-blue-600 font-bold">50% balance</span> due only when you're happy & ready to launch
                 </p>
              </div>

              <div className="hidden md:block w-px h-16 bg-gray-200"></div>

              <div className="flex-shrink-0 text-center md:text-left">
                  <div className="flex items-center gap-2 text-green-600 font-bold mb-1">
                      <ShieldCheck size={20} />
                      <span>Money-Back</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Guarantee</span>
              </div>
            </div>
        </div>
      </div>
    </Section>
  );
};