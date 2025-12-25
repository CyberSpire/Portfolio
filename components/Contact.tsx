import React, { useState, useEffect, useRef } from 'react';
import { Section } from './ui/Section';
import { Mail, Shield, Loader2, User, Phone, Package, MessageSquare, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';
import { MagnetizeButton } from './ui/magnetize-button';
import { motion } from 'framer-motion';
import { WavyBackground } from './ui/wavy-background';
import { ParticlesBackground } from './ui/particles-background';
import { cn } from '../lib/utils';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedPackage, setSelectedPackage] = useState("");
  const [highlightForm, setHighlightForm] = useState(false);
  const [phone, setPhone] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const inputContainerClasses = "relative group";
  const inputIconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors duration-300 pointer-events-none";
  const inputClasses = "w-full pl-12 pr-5 py-4 bg-white/[0.03] text-text border-2 border-white/5 rounded-2xl focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all placeholder-white/20 hover:border-white/20 shadow-sm font-medium text-base relative z-10";
  const labelClasses = "block text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-3 ml-2 relative z-10";

  useEffect(() => {
    const handlePackageSelect = (e: CustomEvent) => {
      if (e.detail && e.detail.package) {
        setSelectedPackage(e.detail.package);
        setHighlightForm(true);
        setTimeout(() => setHighlightForm(false), 2000);
      }
    };
    window.addEventListener('package-selected' as any, handlePackageSelect as any);
    return () => window.removeEventListener('package-selected' as any, handlePackageSelect as any);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
  };

  /**
   * Sanitizes input strings to prevent XSS (Cross-Site Scripting)
   * by removing potentially dangerous characters and HTML tags.
   */
  const sanitizeInput = (str: string) => {
    return str.replace(/[<>]/g, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    // Security: Sanitize all text fields to prevent basic XSS
    const sanitizedEntries: [string, FormDataEntryValue][] = [];
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        sanitizedEntries.push([key, sanitizeInput(value)]);
      } else {
        sanitizedEntries.push([key, value]);
      }
    });

    const sanitizedFormData = new FormData();
    sanitizedEntries.forEach(([key, value]) => sanitizedFormData.append(key, value));

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: sanitizedFormData
        });
        const data = await response.json();
        if (data.success) {
          setFormState('success');
        } else {
          setFormState('error');
        }
    } catch (err) {
        setFormState('error');
    }
  };

  return (
    <>
    <div className="relative overflow-hidden">
        <WavyBackground 
            containerClassName="h-auto min-h-[500px] md:min-h-[600px] py-20" 
            className="max-w-4xl mx-auto px-6 text-center"
            colors={["#fb923c", "#fcd34d", "#f87171", "#fbbf24", "#ea580c"]}
            backgroundFill="#080808" 
            waveWidth={50}
            speed="slow"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
            >
                <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none text-white uppercase italic">
                    Fuel Your <br /> <span className="text-outline">Expansion.</span>
                </h2>
                <p className="text-lg md:text-2xl text-white/60 mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                    Ready to trade average performance for high-speed digital systems? Let's engineer your growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                    <Button 
                        href="#contact-form" 
                        variant="accent" 
                        className="rounded-full px-12 py-5 text-base md:text-lg shadow-2xl"
                    >
                        Initiate Strategy
                    </Button>
                    <Button 
                        href="#pricing" 
                        variant="outline" 
                        className="rounded-full px-12 py-5 border-white/20 text-white hover:bg-white hover:text-background text-base md:text-lg"
                    >
                        View Plans
                    </Button>
                </div>
            </motion.div>
        </WavyBackground>
    </div>

    <Section id="contact" className="py-20 md:py-32 px-4 md:px-6">
      <div id="contact-form" className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-24 items-start">
        
        {/* Left Column: Context Header */}
        <div className="space-y-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Let's Connect</span>
                <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter uppercase italic">
                    Tell us your <br /> <span className="text-outline">Vision.</span>
                </h2>
            </motion.div>

            {/* Hidden on mobile to keep form high up, shown as order-2 on mobile */}
            <div className="hidden lg:block space-y-12">
                <div className="space-y-8">
                    <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                            <Clock size={28} />
                        </div>
                        <div>
                            <p className="text-white font-black text-xl italic uppercase">24H Response</p>
                            <p className="text-muted font-medium">We move as fast as your business does.</p>
                        </div>
                    </div>
                    <a href="mailto:momentumdigital.success@gmail.com" className="flex gap-6 items-center group/mail">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover/mail:bg-primary group-hover/mail:text-white transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0)] group-hover/mail:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            <Mail size={28} />
                        </div>
                        <div>
                            <p className="text-white font-black text-xl italic uppercase group-hover/mail:text-primary transition-colors">Direct Access</p>
                            <p className="text-muted font-medium border-b border-transparent group-hover/mail:border-primary/40 group-hover/mail:text-white/80 transition-all">momentumdigital.success@gmail.com</p>
                        </div>
                    </a>
                </div>

                <div className="bg-card/50 p-8 rounded-[2rem] border border-white/5 space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">What's Next?</p>
                    <div className="space-y-4">
                        {["Consultation Call", "Strategic Blueprint", "Design Sprints", "Performance Launch"].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 text-accent text-[10px] font-black flex items-center justify-center">{idx + 1}</span>
                                <span className="text-white font-bold text-sm uppercase tracking-wide">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Form (Appears order-1 on mobile) */}
        <motion.div 
          className={cn(
            "bg-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-700",
            highlightForm && "border-accent ring-8 ring-accent/5 scale-[1.02]"
          )}
        >
          <ParticlesBackground className="absolute inset-0 opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
              {formState === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-black text-white italic uppercase">Signal Received</h3>
                  <p className="text-muted text-base font-medium max-w-xs mx-auto">We're reviewing your vision and will initiate contact within 24 hours.</p>
                  <button onClick={() => setFormState('idle')} className="text-accent font-black uppercase text-xs tracking-widest border-b border-accent pb-1">Reset Interface</button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <input type="hidden" name="access_key" value="c7884e58-2605-4610-baf7-5a1f10e1f37f" />
                  <input type="hidden" name="subject" value="New Project Inquiry - Momentum Digital" />
                  <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
                  
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <label htmlFor="name" className={labelClasses}>Identity</label>
                      <div className={inputContainerClasses}>
                        <User size={18} className={inputIconClasses} />
                        <input type="text" id="name" name="name" required placeholder="Your name" className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>Signal Path</label>
                      <div className={inputContainerClasses}>
                        <Mail size={18} className={inputIconClasses} />
                        <input type="email" id="email" name="email" required placeholder="your@email.com" className={inputClasses} />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Voice Path</label>
                      <div className={inputContainerClasses}>
                        <Phone size={18} className={inputIconClasses} />
                        <input type="tel" id="phone" name="phone" value={phone} onChange={handlePhoneChange} placeholder="1234567890" className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="package" className={labelClasses}>Growth Engine</label>
                      <div className={inputContainerClasses}>
                        <Package size={18} className={inputIconClasses} />
                        <select id="package" name="package" required value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} className={inputClasses}>
                          <option value="">Select Package</option>
                          <option value="Starter Package ($199)">Starter Package</option>
                          <option value="Business Package ($399)">Business Package</option>
                          <option value="Growth Package ($999)">Growth Package</option>
                          <option value="Custom">Custom Architecture</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>Project Parameters</label>
                    <div className={inputContainerClasses}>
                        <MessageSquare size={18} className={`${inputIconClasses} top-8`} />
                        <textarea id="message" name="message" required rows={4} placeholder="Briefly describe your goals..." className={cn(inputClasses, "resize-none h-32")}></textarea>
                    </div>
                  </div>

                  <MagnetizeButton type="submit" disabled={formState === 'submitting'} variant="accent" className="w-full py-7 md:py-8 text-lg md:text-xl font-black rounded-2xl group shadow-2xl">
                    {formState === 'submitting' ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="animate-spin" size={20} /> Transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        Launch Inquiry <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </MagnetizeButton>
                </form>
              )}
          </div>
        </motion.div>

        {/* Informational content for mobile view (Appears after form) */}
        <div className="lg:hidden space-y-12 pb-12">
            <div className="grid grid-cols-1 gap-6">
                <div className="flex gap-4 items-center bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-white font-black text-base italic uppercase">24H Response</p>
                        <p className="text-muted text-xs">We move as fast as you do.</p>
                    </div>
                </div>
                <a href="mailto:momentumdigital.success@gmail.com" className="flex gap-4 items-center bg-white/[0.03] p-4 rounded-2xl border border-white/5 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-white font-black text-base italic uppercase">Direct Access</p>
                        <p className="text-muted text-[10px] break-all">momentumdigital.success@gmail.com</p>
                    </div>
                </a>
            </div>

            <div className="bg-card/50 p-6 rounded-[2rem] border border-white/5 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">What's Next?</p>
                <div className="grid grid-cols-2 gap-4">
                    {["Consult Call", "Blueprint", "Design Sprint", "Launch"].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 text-accent text-[10px] font-black flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                            <span className="text-white font-bold text-[10px] uppercase tracking-wide">{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </Section>
    </>
  );
};