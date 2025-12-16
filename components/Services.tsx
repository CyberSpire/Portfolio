import React from 'react';
import { Section } from './ui/Section';
import { Rocket, GraduationCap, Lock, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  className?: string;
}

const GridItem = ({ icon, title, description, features, className }: GridItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
          "group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col", 
          className
      )}
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      <ul className="space-y-3 pt-6 border-t border-gray-50">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start text-sm font-medium text-gray-700">
            <div className="mt-0.5 mr-3 p-0.5 rounded-full bg-green-100 text-green-600 shrink-0">
                <Check size={12} strokeWidth={3} />
            </div>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <Section id="services" className="bg-white py-24 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 max-w-3xl mx-auto px-4"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-4 border border-blue-100">
            Our Expertise
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Services Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Growth</span>
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Everything you need to succeed online, designed specifically for small business owners who want results, not headaches.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        <GridItem 
          icon={<Rocket />}
          title="Professional Websites"
          description="High-performance websites designed to rank on Google and turn visitors into paying customers. We build them fast and we build them right."
          features={["Mobile-responsive design", "SEO-optimized structure", "Fast loading speeds"]}
        />
        
        <GridItem 
          icon={<Lock />}
          title="Complete Ownership"
          description="Stop renting your website. With us, you pay once and own everything 100% forever. No monthly subscriptions or hidden fees."
          features={["No monthly fees", "Full code ownership", "Secure SSL & Hosting"]}
        />
        
        <GridItem 
          icon={<GraduationCap />}
          title="Training & Support"
          description="We don't disappear after launch. You get personalized video training and 30 days of priority support to ensure you're confident."
          features={["Step-by-step video guides", "30 days priority support", "No technical skills needed"]}
        />
      </div>
    </Section>
  );
};