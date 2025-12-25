
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { BrandLogo } from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Map as MapIcon, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.482h2.039L6.486 3.24H4.298l13.311 17.395z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'sitemap' | null>(null);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#' || href === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const LegalModal = () => (
    <AnimatePresence>
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalType(null)} className="absolute inset-0 bg-background/90 backdrop-blur-md" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-card w-full max-w-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
            <button onClick={() => setModalType(null)} className="absolute top-10 right-10 text-muted hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="flex items-center gap-6 mb-10">
              <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                {modalType === 'privacy' && <Shield size={32} />}
                {modalType === 'terms' && <FileText size={32} />}
                {modalType === 'sitemap' && <MapIcon size={32} />}
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-white italic">
                {modalType === 'privacy' && "Privacy Policy"}
                {modalType === 'terms' && "Terms of Service"}
                {modalType === 'sitemap' && "Sitemap"}
              </h2>
            </div>
            <div className="text-muted text-base space-y-4 font-medium leading-relaxed">
              <p>{modalType === 'privacy' && "We treat your data like our own. We only collect details essential for engineering your digital assets. No tracking, no reselling."}</p>
              <p>{modalType === 'terms' && "Full code ownership is transferred upon final payment. We provide lifetime hosting support as a value-add, not a lock-in."}</p>
              {modalType === 'sitemap' && <div className="grid grid-cols-2 gap-4 uppercase font-black text-xs tracking-widest text-white/40">
                <span>Home</span><span>Services</span><span>Process</span><span>Portfolio</span><span>Pricing</span><span>About</span>
              </div>}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <footer className="bg-background pt-20 md:pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      <style>{`
        .momentum-text {
          position: relative;
          color: rgba(255, 255, 255, 0.05);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          transition: 0.5s;
          cursor: default;
          display: inline-block;
          padding: 0 0.2em; /* Buffer for italic lean */
        }
        .momentum-text:hover {
          color: transparent;
        }
        .momentum-text:before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0.2em; /* Align with parent padding */
          width: 0%;
          height: 100%;
          color: #F97316;
          -webkit-text-stroke: 1px #F97316;
          border-right: 4px solid #F97316;
          filter: drop-shadow(0 0 20px #F97316);
          overflow: hidden;
          transition: 1s;
          white-space: nowrap;
        }
        .momentum-text:hover:before {
          width: calc(100% - 0.4em); /* Account for padding both sides */
        }
      `}</style>
      
      <LegalModal />
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Massive Footer Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20 md:mb-32">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-5xl md:text-[10vw] font-display font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                    Let's Build <br /> <span className="text-outline">Something.</span>
                </h2>
            </motion.div>
            <a href="#contact" className="group flex items-center gap-4 bg-accent p-6 md:p-8 rounded-full shadow-2xl hover:scale-105 transition-transform duration-500">
                <span className="text-white font-black uppercase tracking-widest text-xs md:text-sm">Start a Project</span>
                <ArrowUpRight className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
        </div>

        <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-32">
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <BrandLogo className="w-8 h-8 md:w-10 md:h-10" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-display font-black tracking-tighter uppercase text-white leading-none italic">
                    MOMENTUM <span className="text-accent not-italic ml-2">DIGITAL</span>
                </span>
                <span className="text-[8px] md:text-[10px] font-black tracking-[0.4em] text-accent/80 uppercase mt-1">PROPELLING SUCCESS</span>
              </div>
            </div>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-sm font-medium">
              A specialized digital foundry engineering high-performance growth systems for ambitious business owners worldwide.
            </p>
            <div className="flex gap-4">
                 {[
                    { icon: <Linkedin size={18} />, href: "#", color: "hover:bg-blue-600" },
                    { icon: <XIcon size={16} />, href: "#", color: "hover:bg-white hover:text-black" },
                    { icon: <Instagram size={18} />, href: "#", color: "hover:bg-pink-600" }
                 ].map((social, i) => (
                    <a key={i} href={social.href} className={cn("w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all duration-300", social.color)}>{social.icon}</a>
                 ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 md:col-span-2 gap-8 md:gap-0">
            <div className="md:pl-12">
              <h3 className="text-[10px] font-black mb-6 md:mb-10 text-accent uppercase tracking-[0.4em]">Index</h3>
              <ul className="space-y-3 md:space-y-4 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest">
                <li><a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="hover:text-accent transition-all duration-300">HOME</a></li>
                <li><a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="hover:text-accent transition-all duration-300">PORTFOLIO</a></li>
                <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-accent transition-all duration-300">PRICING</a></li>
                <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="hover:text-accent transition-all duration-300">ABOUT</a></li>
              </ul>
            </div>

            <div className="md:pl-12">
              <h3 className="text-[10px] font-black mb-6 md:mb-10 text-primary uppercase tracking-[0.4em]">Capabilities</h3>
              <ul className="space-y-3 md:space-y-4 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest">
                {["Full-Stack", "SEO Optm", "UI/UX Des", "Custom Sys"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 md:gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                     <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reduced size massive text for better visibility */}
        <div className="pt-12 text-center select-none overflow-visible w-full">
            <h3 
              data-text="MOMENTUM"
              className="momentum-text text-[11vw] md:text-[15vw] font-display font-black leading-none uppercase italic tracking-tighter"
            >
              MOMENTUM
            </h3>
        </div>

        <div className="border-t border-white/5 mt-12 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] text-center md:text-left">© 2024 MOMENTUM DIGITAL. ENGINEERED FOR PERFORMANCE.</p>
          <div className="flex gap-6 md:gap-10 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
              <button onClick={() => setModalType('privacy')} className="hover:text-accent transition-colors">Privacy</button>
              <button onClick={() => setModalType('terms')} className="hover:text-accent transition-colors">Terms</button>
              <button onClick={() => setModalType('sitemap')} className="hover:text-accent transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
