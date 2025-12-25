
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
  const inputIconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors duration-300 pointer-events-none";
  const inputClasses = "w-full pl-12 pr-5 py-4 bg-white/[0.08] text-white border-2 border-white/10 rounded-2xl focus:ring-4 focus:ring-accent/20 focus:border-accent outline-none transition-all placeholder-white/30 hover:border-white/30 shadow-sm font-medium text-base relative z-10";
  const labelClasses = "block text-[12px] font-black uppercase tracking-[0.3em] text-white mb-3 ml-2 relative z-10";

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

  const sanitizeInput = (str: string) => {
    return str.replace(/[<>]/g, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
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
            containerClassName="h-auto min-h-[500px] md:min-h-[600px] py-24 md:py-32" 
            className="max-w-4xl mx-auto px-6 text-center"
            colors={["#4F46E5", "#7C3AED", "#9333EA", "#6366F1", "#1E1B4B"]}
            backgroundFill="#0B0118" 
            waveWidth={50}
            speed="slow"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 md:space-y-12"
            >
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.95] text-white uppercase italic">
                    Fuel Your <br /> <span className="text-outline">Expansion.</span>
                </h2>
                <p className="text-lg md:text-2xl text-white mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
                    Ready to build a high-speed website that actually brings in customers? Let's talk.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button 
                        href="#contact-form" 
                        variant="accent" 
                        className="rounded-full px-12 py-5 text-lg md:text-xl shadow-[0_20px_50px_rgba(249,115,22,0.3)]"
                    >
                        Start Now
                    </Button>
                    <Button 
                        href="#pricing" 
                        variant="outline" 
                        className="rounded-full px-12 py-5 border-white/60 text-white hover:bg-white hover:text-background text-lg md:text-xl backdrop-blur-md"
                    >
                        See Plans
                    </Button>
                </div>
            </motion.div>
        </WavyBackground>
    </div>

    <Section id="contact" className="py-20 md:py-40 px-4 md:px-6">
      <div id="contact-form" className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-start">
        
        <div className="space-y-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Let's Connect</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                    Tell us your <br /> <span className="text-outline">Vision.</span>
                </h2>
            </motion.div>

            <div className="space-y-12">
                <div className="space-y-10">
                    <div className="flex gap-8 items-center group">
                        <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl">
                            <Clock size={28} />
                        </div>
                        <div>
                            <p className="text-white font-black text-2xl italic uppercase tracking-tight">Quick Reply</p>
                            <p className="text-white/80 font-medium text-lg">We'll get back to you within 24 hours.</p>
                        </div>
                    </div>
                    <a href="mailto:momentumdigital.success@gmail.com" className="flex gap-8 items-center group/mail">
                        <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-primary group-hover/mail:bg-primary group-hover/mail:text-white transition-all duration-500 shadow-xl">
                            <Mail size={28} />
                        </div>
                        <div>
                            <p className="text-white font-black text-2xl italic uppercase tracking-tight">Email Us</p>
                            <p className="text-white/80 font-medium text-lg">momentumdigital.success@gmail.com</p>
                        </div>
                    </a>
                </div>

                <div className="bg-white/[0.05] p-10 rounded-[2.5rem] border border-white/20 space-y-8 backdrop-blur-sm shadow-xl">
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] text-accent">10-Day Process</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                          { label: "First Chat", color: "bg-accent/40 border-accent" },
                          { label: "The Plan", color: "bg-primary/40 border-primary" },
                          { label: "Building Site", color: "bg-blue-600/40 border-blue-500" },
                          { label: "Go Live", color: "bg-green-600/40 border-green-500" }
                        ].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-5">
                                <span className={cn("w-10 h-10 rounded-2xl border-2 text-white text-sm font-black flex items-center justify-center shadow-lg", step.color)}>
                                  {idx + 1}
                                </span>
                                <span className="text-white font-black text-base uppercase tracking-tighter italic">{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <motion.div 
          className={cn(
            "bg-[#111111]/90 p-8 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-3xl transition-all duration-500",
            highlightForm && "border-accent ring-8 ring-accent/20"
          )}
        >
          <div className="relative z-10">
              {formState === 'success' ? (
                <div className="text-center py-24 space-y-8">
                  <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                    <Shield size={40} />
                  </div>
                  <h3 className="text-4xl font-display font-black text-white italic uppercase tracking-tight">Sent Successfully</h3>
                  <p className="text-white/80 text-lg font-medium">We'll reach out very soon!</p>
                  <button onClick={() => setFormState('idle')} className="text-accent font-black uppercase text-sm border-b-2 border-accent/40 hover:border-accent pb-1">Send Another</button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <input type="hidden" name="access_key" value="c7884e58-2605-4610-baf7-5a1f10e1f37f" />
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className={labelClasses}>Full Name</label>
                      <div className={inputContainerClasses}>
                        <User size={18} className={inputIconClasses} />
                        <input type="text" id="name" name="name" required placeholder="Enter your name" className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>Email Address</label>
                      <div className={inputContainerClasses}>
                        <Mail size={18} className={inputIconClasses} />
                        <input type="email" id="email" name="email" required placeholder="name@company.com" className={inputClasses} />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                      <div className={inputContainerClasses}>
                        <Phone size={18} className={inputIconClasses} />
                        <input type="tel" id="phone" name="phone" value={phone} onChange={handlePhoneChange} placeholder="123-456-7890" className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="package" className={labelClasses}>Choose a Plan</label>
                      <div className={inputContainerClasses}>
                        <Package size={18} className={inputIconClasses} />
                        <select id="package" name="package" required value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} className={inputClasses}>
                          <option value="">Select Interested Plan</option>
                          <option value="Starter">Starter ($199)</option>
                          <option value="Business">Business ($399)</option>
                          <option value="Growth">Growth ($999)</option>
                          <option value="Custom">Custom Quote</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>Message</label>
                    <div className={inputContainerClasses}>
                        <MessageSquare size={18} className={`${inputIconClasses} top-8`} />
                        <textarea id="message" name="message" required rows={4} placeholder="Tell us briefly about your project goals..." className={cn(inputClasses, "resize-none h-40")}></textarea>
                    </div>
                  </div>

                  <MagnetizeButton type="submit" disabled={formState === 'submitting'} variant="accent" className="w-full py-6 md:py-8 text-lg font-black rounded-3xl group shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    {formState === 'submitting' ? "Transmitting..." : "Send Inquiry"}
                  </MagnetizeButton>
                </form>
              )}
          </div>
        </motion.div>
      </div>
    </Section>
    </>
  );
};
