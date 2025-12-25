
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const projects = [
  {
    title: "Bella Italia",
    category: "Restaurant & Dining",
    year: "2024",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://italia-cafe.vercel.app/",
    description: "A high-conversion menu and booking system for a premium Italian cafe."
  },
  {
    title: "Green Valley",
    category: "Real Estate",
    year: "2024",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://green-valley-homes.vercel.app/",
    description: "Immersive property listings designed to capture high-value leads."
  },
  {
    title: "Apex Plumbing",
    category: "Home Services",
    year: "2024",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://plumber-service-support.vercel.app/",
    description: "A specialized lead-generation engine for local plumbing and repair services."
  }
];

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="bg-background py-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Case Studies</span>
                <h2 className="text-6xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter">
                    SELECTED <br /> <span className="text-outline">WORKS</span>
                </h2>
            </motion.div>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-xs text-muted font-medium text-lg text-right"
            >
                We build high-performance assets, not just "pretty" websites.
            </motion.p>
        </div>

        <div className="space-y-40">
            {projects.map((project, idx) => (
                <ProjectItem key={idx} project={project} index={idx} />
            ))}
        </div>
      </div>
    </section>
  );
};

const ProjectItem: React.FC<{ project: any; index: number }> = ({ project, index }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="group grid md:grid-cols-2 gap-12 items-center"
        >
            <div className={cn("relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer perspective-lg", index % 2 !== 0 && "md:order-2")}>
                <motion.div 
                   whileHover={{ rotateY: index % 2 === 0 ? 5 : -5, rotateX: 2, scale: 1.02 }}
                   transition={{ type: "spring", stiffness: 100 }}
                   className="w-full h-full"
                >
                    <motion.img 
                        src={project.image} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            </div>

            <div className={cn("flex flex-col gap-8", index % 2 !== 0 && "md:order-1 md:text-right md:items-end")}>
                <div className="flex items-center gap-4 text-accent font-black text-xs uppercase tracking-[0.2em]">
                    <span>{project.year}</span>
                    <span className="w-8 h-[1px] bg-white/20"></span>
                    <span>{project.category}</span>
                </div>
                <h3 className="text-4xl md:text-7xl font-display font-black text-white group-hover:text-accent transition-colors duration-500 leading-none uppercase italic">
                    {project.title}
                </h3>
                <p className="text-muted text-lg md:text-xl max-w-md font-medium">
                    {project.description}
                </p>
                <Button 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="outline" 
                    className="w-fit rounded-full border-white/10 group-hover:border-accent"
                >
                    View Live Demo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </motion.div>
    );
}
