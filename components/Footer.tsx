
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { BrandLogo } from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Map as MapIcon, ArrowUpRight, Globe } from 'lucide-react';

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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalType(null)} className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative bg-card w-full max-w-3xl p-12 md:p-16 rounded-[4rem] border border-white/10 shadow-3xl max-h-[80vh] overflow-y-auto">
            <button onClick={() => setModalType(null)} className="absolute top-12 right-12 text-muted hover:text-white transition-colors p-3 bg-white/5 rounded-full">
              <X size={24} />
            </button>
            <div className="flex items-center gap-8 mb-12">
              <div className="p-5 rounded-3xl bg-accent/10 text-accent">
                {modalType === 'privacy' && <Shield size={40} />}
                {modalType === 'terms' && <FileText size={40} />}
                {modalType === 'sitemap' && <MapIcon size={40} />}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white italic">
                {modalType === 'privacy' && "Privacy Policy"}
                {modalType === 'terms' && "Terms of Service"}
                {modalType === 'sitemap' && "Sitemap"}
              </h2>
            </div>
            <div className="text-muted text-lg space-y-6 font-medium leading-relaxed">
              <p>{modalType === 'privacy' && "We treat your data like our own. We only collect details essential for engineering your digital assets. No tracking, no reselling. Your privacy is non-negotiable."}</p>
              <p>{modalType === 'terms' && "Full code ownership is transferred upon final payment. We provide lifetime hosting support as a value-add, not a lock-in. Our goal is your complete independence."}</p>
              {modalType === 'sitemap' && <div className="grid grid-cols-2 md:grid-cols-3 gap-6 uppercase font-black text-xs tracking-widest text-white/50 pt-6">
                <span className="hover:text-accent cursor-pointer">Home</span>
                <span className="hover:text-accent cursor-pointer">Services</span>
                <span className="hover:text-accent cursor-pointer">Process</span>
                <span className="hover:text-accent cursor-pointer">Portfolio</span>
                <span className="hover:text-accent cursor-pointer">Pricing</span>
                <span className="hover:text-accent cursor-pointer">About</span>
                <span className="hover:text-accent cursor-pointer">Contact</span>
                <span className="hover:text-accent cursor-pointer">Resources</span>
              </div>}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <footer className="bg-background pt-24 pb-12 px-6 border-t border-white/10 relative overflow-hidden">
      <style>{`
        .momentum-text {
          position: relative;
          color: rgba(255, 255, 255, 0.05);
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.1);
          transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          display: inline-block;
          padding: 0 0.2em;
        }
        .momentum-text:hover {
          color: transparent;
        }
        .momentum-text:before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0.2em;
          width: 0%;
          height: 100%;
          color: #F97316;
          -webkit-text-stroke: 1.5px #F97316;
          border-right: 6px solid #F97316;
          filter: drop-shadow(0 0 30px #F97316);
          overflow: hidden;
          transition: 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }
        .momentum-text:hover:before {
          width: calc(100% - 0.4em);
        }
      `}</style>
      
      <LegalModal />
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-6xl md:text-[11vw] font-display font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                    Let's Build <br /> <span className="text-outline">Something.</span>
                </h2>
            </motion.div>
            <a href="#contact" className="group flex items-center gap-6 bg-accent p-8 md:p-10 rounded-full shadow-2xl hover:scale-[1.05] transition-all duration-500">
                <span className="text-white font-black uppercase tracking-widest text-sm md:text-lg">Get Started</span>
                <ArrowUpRight size={28} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mb-12 border-b border-white/5 pb-12">
          <div className="md:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <BrandLogo className="w-12 h-12" />
                <div className="flex flex-col">
                  <span className="text-3xl font-display font-black tracking-tighter uppercase text-white leading-none italic">
                      MOMENTUM <span className="text-accent not-italic ml-1">DIGITAL</span>
                  </span>
                  <span className="text-[10px] font-black tracking-[0.5em] text-accent/80 uppercase mt-2">PROPELLING SUCCESS</span>
                </div>
              </div>
              <p className="text-white font-medium text-lg leading-relaxed max-w-md">
                Expert web design for small businesses who want to grow faster. We build fast, high-quality websites that you own forever.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-[12px] font-black text-accent uppercase tracking-[0.4em]">Index</h3>
              <ul className="space-y-3 text-white font-black text-xs uppercase tracking-[0.2em]">
                <li><a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="hover:text-accent transition-all duration-300 block">HOME</a></li>
                <li><a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="hover:text-accent transition-all duration-300 block">PORTFOLIO</a></li>
                <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-accent transition-all duration-300 block">PRICING</a></li>
                <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="hover:text-accent transition-all duration-300 block">ABOUT</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-[12px] font-black text-white/40 uppercase tracking-[0.4em]">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest">
                  <Globe size={14} className="text-accent" />
                  <span>Available Globally</span>
                </div>
                <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span>Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding Container: Smaller font size on desktop to ensure full visibility */}
        <div className="relative text-center select-none overflow-visible w-full py-8 md:py-12">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-20 md:h-28 bg-white/[0.03] border-y border-white/10 backdrop-blur-md -z-10 shadow-inner" />
            <h3 
              data-text="MOMENTUM"
              className="momentum-text text-[14vw] md:text-[13vw] font-display font-black leading-none uppercase italic tracking-tighter"
            >
              MOMENTUM
            </h3>
        </div>

        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em]">© 2024 MOMENTUM DIGITAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 md:gap-10 text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">
              <button onClick={() => setModalType('privacy')} className="hover:text-accent transition-all">Privacy</button>
              <button onClick={() => setModalType('terms')} className="hover:text-accent transition-all">Terms</button>
              <button onClick={() => setModalType('sitemap')} className="hover:text-accent transition-all">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
