import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ExternalLink, Check, Code2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  tech: string[];
  demoUrl: string;
  color: "blue" | "emerald" | "orange";
}

const projects: Project[] = [
  {
    title: "Bella Italia",
    category: "Restaurant & Hospitality",
    description: "We built a modern, appetizing digital presence for Bella Italia. The goal was simple: make visitors hungry before they even step through the door. With a custom menu integration and high-fidelity food photography, online reservations increased by 40% in the first month.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop",
    features: ["Mobile-First Digital Menu", "One-Click Table Reservation", "Instagram Gallery Feed"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://example.com/bella-italia",
    color: "blue"
  },
  {
    title: "Green Valley Homes",
    category: "Real Estate",
    description: "Green Valley needed a platform that reflected the premium nature of their listings. We delivered a sleek, high-performance portfolio site with advanced filtering, virtual tour integration, and a seamless contact workflow for potential buyers.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    features: ["Virtual Tour Integration", "Advanced Property Search", "Agent Profile System"],
    tech: ["React", "Mapbox", "Sanity CMS"],
    demoUrl: "https://example.com/green-valley",
    color: "emerald"
  },
  {
    title: "ProTech Plumbing",
    category: "Home Services",
    description: "When pipes burst, customers need help fast. We designed ProTech's site for speed and accessibility. With a prominent 'Emergency Call' button and location-based SEO, they dominated local search results within 6 weeks of launch.",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=2674&auto=format&fit=crop",
    features: ["One-Tap Emergency Call", "Service Area Map", "Instant Quote Calculator"],
    tech: ["Next.js", "Google Maps API", "Twilio"],
    demoUrl: "https://example.com/protech",
    color: "orange"
  }
];

export const Portfolio: React.FC = () => {
  return (
    <div id="portfolio" className="bg-gray-50/50 py-24 px-4 relative z-20">
       <div className="max-w-7xl mx-auto">
         {/* Header */}
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-4 border border-blue-100">
                Our Work
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Masterpieces</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
               A showcase of our finest work. Every pixel crafted with purpose, every line of code written for performance.
            </p>
         </div>

         {/* Projects List */}
         <div className="flex flex-col gap-16">
            {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
            ))}
         </div>

         {/* CTA Footer */}
         <div className="mt-24 text-center">
             <h3 className="text-3xl font-bold mb-8 text-gray-900">Ready to start your project?</h3>
             <Button href="#contact" variant="primary" className="px-10 py-5 text-xl shadow-xl shadow-blue-200">
                Let's Build Something Great
             </Button>
         </div>
       </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const isEven = index % 2 === 0;

    const colorClasses = {
        blue: "bg-blue-50 text-blue-700",
        emerald: "bg-emerald-50 text-emerald-700",
        orange: "bg-orange-50 text-orange-700",
    };

    const iconColors = {
        blue: "text-blue-600",
        emerald: "text-emerald-600",
        orange: "text-orange-600",
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform-gpu"
        >
            {/* Image Section - Interactive Zoom */}
            <div className={cn(
                "lg:w-7/12 relative h-72 lg:h-auto min-h-[400px] overflow-hidden",
                !isEven ? "lg:order-2" : "lg:order-1"
            )}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                     style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 lg:opacity-60 transition-opacity group-hover:opacity-40" />
                
                {/* Mobile Badge */}
                <div className="absolute bottom-6 left-6 lg:hidden">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className={cn(
                "lg:w-5/12 p-8 lg:p-12 flex flex-col justify-between relative",
                !isEven ? "lg:order-1" : "lg:order-2"
            )}>
                {/* Decorative background blob */}
                <div className={cn(
                    "absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none",
                    project.color === 'blue' ? "bg-blue-300" : project.color === 'emerald' ? "bg-emerald-300" : "bg-orange-300"
                )} />

                <div>
                    <div className="hidden lg:inline-block mb-4">
                         <span className={cn("px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase", colorClasses[project.color])}>
                            {project.category}
                        </span>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>
                    
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {project.description}
                    </p>

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Zap size={14} className={iconColors[project.color]} /> Key Features
                        </h4>
                        <div className="space-y-3">
                            {project.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                                    <div className={cn("mt-1 p-0.5 rounded-full bg-gray-100", iconColors[project.color])}>
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Tech Stack */}
                    <div>
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Code2 size={14} /> Technology
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-semibold border border-gray-100">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Prominent Button */}
                    <div className="pt-6 border-t border-gray-100">
                         <Button 
                            href={project.demoUrl} 
                            className="w-full py-6 text-lg font-bold shadow-lg shadow-blue-500/20 group/btn"
                         >
                             View Live Demo 
                             <ExternalLink className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                         </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
