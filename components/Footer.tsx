
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { BrandLogo } from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Map as MapIcon, ArrowUpRight, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'sitemap' | null>(null);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setModalType(null); // Close modal if open
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalType(null)} className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative bg-card w-full max-w-3xl p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-3xl max-h-[80vh] overflow-y-auto">
            <button onClick={() => setModalType(null)} className="absolute top-10 right-10 text-muted hover:text-white transition-colors p-3 bg-white/5 rounded-full">
              <X size={20} />
            </button>
            <div className="flex items-center gap-6 mb-10">
              <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                {modalType === 'privacy' && <Shield size={32} />}
                {modalType === 'terms' && <FileText size={32} />}
                {modalType === 'sitemap' && <MapIcon size={32} />}
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tight text-white italic">
                {modalType === 'privacy' && "Privacy Policy"}
                {modalType === 'terms' && "Terms of Service"}
                {modalType === 'sitemap' && "Sitemap"}
              </h2>
            </div>
            <div className="text-muted text-base md:text-lg space-y-6 font-medium leading-relaxed opacity-90">
              {modalType === 'privacy' && <p>We treat your data like our own. We only collect details essential for engineering your digital assets. No tracking, no reselling. Your privacy is non-negotiable.</p>}
              {modalType === 'terms' && <p>Full code ownership is transferred upon final payment. We provide lifetime hosting support as a value-add, not a lock-in. Our goal is your complete independence.</p>}
              {modalType === 'sitemap' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 uppercase font-black text-[10px] tracking-widest text-white/50 pt-4">
                  <a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="hover:text-accent transition-all">Home</a>
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="hover:text-accent transition-all">Services</a>
                  <a href="#process" onClick={(e) => handleSmoothScroll(e, '#process')} className="hover:text-accent transition-all">Process</a>
                  <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="hover:text-accent transition-all">Portfolio</a>
                  <a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-accent transition-all">Pricing</a>
                  <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="hover:text-accent transition-all">About</a>
                  <a href="#faq" onClick={(e) => handleSmoothScroll(e, '#faq')} className="hover:text-accent transition-all">FAQ</a>
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="hover:text-accent transition-all">Contact</a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <footer className="bg-background pt-20 pb-10 px-6 border-t border-white/10 relative overflow-hidden">
      <style>{`
        .momentum-text {
          position: relative;
          color: rgba(255, 255, 255, 0.05);
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.1);
          transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          display: inline-block;
          padding: 0 0.15em;
        }
        .momentum-text:hover {
          color: transparent;
        }
        .momentum-text:before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0.15em;
          width: 0%;
          height: 100%;
          color: #F97316;
          -webkit-text-stroke: 1.5px #F97316;
          border-right: 4px solid #F97316;
          filter: drop-shadow(0 0 30px #F97316);
          overflow: hidden;
          transition: 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }
        .momentum-text:hover:before {
          width: calc(100% - 0.3em);
        }
      `}</style>
      
      <LegalModal />
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-10">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.95] tracking-tighter uppercase italic">
                    Let's Build <br /> <span className="text-outline">Something.</span>
                </h2>
            </motion.div>
            <a href="#contact" className="group flex items-center gap-5 bg-accent px-8 py-5 rounded-full shadow-2xl hover:scale-[1.05] transition-all duration-500">
                <span className="text-white font-black uppercase tracking-widest text-sm md:text-base">Get Started</span>
                <ArrowUpRight size={24} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
        </div>

        <div className="grid md:grid-cols-12 gap-10 mb-10 border-b border-white/5 pb-10">
          <div className="md:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <BrandLogo className="w-10 h-10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-black tracking-tighter uppercase text-white leading-none italic">
                      MOMENTUM <span className="text-accent not-italic ml-1">WEB</span>
                  </span>
                  <span className="text-[8px] font-black tracking-[0.5em] text-accent/80 uppercase mt-1.5">PROPELLING SUCCESS</span>
                </div>
              </div>
              <p className="text-white font-medium text-base leading-relaxed max-w-md opacity-70">
                Expert web development for businesses who want to grow faster. We build fast, high-quality websites that you own forever.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.4em]">Index</h3>
              <ul className="space-y-3 text-white font-black text-[10px] uppercase tracking-[0.2em]">
                <li><a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="hover:text-accent transition-all block">HOME</a></li>
                <li><a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="hover:text-accent transition-all block">PORTFOLIO</a></li>
                <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-accent transition-all block">PRICING</a></li>
                <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="hover:text-accent transition-all block">ABOUT</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Status</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-white font-black text-[9px] uppercase tracking-widest">
                  <Globe size={12} className="text-accent" />
                  <span>Global Availability</span>
                </div>
                <div className="flex items-center gap-3 text-white font-black text-[9px] uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Systems Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding Container: Rescaled background text */}
        <div className="relative text-center select-none overflow-visible w-full py-8 md:py-10">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 md:h-24 bg-white/[0.03] border-y border-white/10 backdrop-blur-md -z-10 shadow-inner" />
            <h3 
              data-text="MOMENTUM"
              className="momentum-text text-[12vw] md:text-[8vw] lg:text-[9vw] font-display font-black leading-none uppercase italic tracking-tighter"
            >
              MOMENTUM
            </h3>
        </div>

        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.4em]">© 2024 MOMENTUM WEB. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 md:gap-8 text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">
              <button onClick={() => setModalType('privacy')} className="hover:text-accent transition-all">Privacy</button>
              <button onClick={() => setModalType('terms')} className="hover:text-accent transition-all">Terms</button>
              <button onClick={() => setModalType('sitemap')} className="hover:text-accent transition-all">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};