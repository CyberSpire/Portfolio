import React, { useState, useEffect, useRef } from 'react';
import { Section } from './ui/Section';
import { Mail, Calendar, Clock, Shield, Loader2, User, Phone, Briefcase, Package, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { MagnetizeButton } from './ui/magnetize-button';
import { motion } from 'framer-motion';
import { WavyBackground } from './ui/wavy-background';
import { ParticlesBackground } from './ui/particles-background';

/* 
  CONFIGURATION INSTRUCTIONS:
  To make this contact form work, you need a free Access Key from Web3Forms.
  1. Go to https://web3forms.com/
  2. Enter your email address to create a free Access Key.
  3. Replace 'YOUR_ACCESS_KEY_HERE' in the form below with your actual key.
  
  SECURITY NOTE:
  It is safe to include this key in client-side code IF you configure "Allowed Domains"
  in your Web3Forms dashboard. This prevents others from using your key on their websites.
  Web3Forms also has built-in spam protection (Honeypot, reCAPTCHA).
*/

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedPackage, setSelectedPackage] = useState("");
  const [highlightForm, setHighlightForm] = useState(false);
  const [phone, setPhone] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Standardized input classes for consistent look and high visibility
  const inputContainerClasses = "relative";
  const inputIconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none";
  const inputClasses = "w-full pl-12 pr-5 py-4 bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all placeholder-gray-400 hover:border-gray-400 shadow-sm font-medium text-base relative z-10";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2 ml-1 relative z-10";

  useEffect(() => {
    // Listen for package selection from Pricing component
    const handlePackageSelect = (e: CustomEvent) => {
      if (e.detail && e.detail.package) {
        // Map simplified names to the actual select values
        const mapping: Record<string, string> = {
          "Starter Package": "Starter Package ($199)",
          "Business Package": "Business Package ($399)",
          "Growth Package": "Growth Package ($999)"
        };
        
        const value = mapping[e.detail.package];
        if (value) {
          setSelectedPackage(value);
          setHighlightForm(true);
          // Remove highlight after animation
          setTimeout(() => setHighlightForm(false), 2000);
        }
      }
    };

    window.addEventListener('package-selected' as any, handlePackageSelect as any);
    return () => window.removeEventListener('package-selected' as any, handlePackageSelect as any);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    // In production, change the hidden input 'access_key' value below to your real key.
    try {
        await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        setFormState('success');
    } catch (err) {
        setFormState('error');
    }
  };

  return (
    <>
    {/* CTA Section with Wavy Background */}
    <div className="relative overflow-hidden">
        <WavyBackground 
            containerClassName="h-auto min-h-[500px] py-20" 
            className="max-w-4xl mx-auto px-4 text-center"
            colors={["#60a5fa", "#818cf8", "#c084fc", "#a78bfa", "#3b82f6"]}
            backgroundFill="#1e1b4b" /* dark indigo/blue background */
            waveWidth={50}
            speed="slow"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-white drop-shadow-md">
                    Ready to Get Your Business Online?
                </h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
                    Join other ambitious owners who are growing their customer base with professional websites.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button 
                        href="#contact" 
                        variant="white" 
                        className="font-bold text-lg px-8 py-4 shadow-xl shadow-blue-900/40 hover:shadow-blue-900/60 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        Schedule Free Consultation
                    </Button>
                    <Button 
                        href="#pricing" 
                        variant="outline" 
                        className="bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-indigo-900 hover:border-white transition-all font-bold backdrop-blur-sm text-lg px-8 py-4 hover:scale-105 active:scale-95"
                    >
                        View Pricing
                    </Button>
                </div>
            </motion.div>
        </WavyBackground>
    </div>

    <Section id="contact">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Let's Talk About Your Website</h2>
        <p className="text-xl text-gray-600">Free consultation. No pressure. Get a custom quote in 24 hours.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left Column: Form */}
        <motion.div 
          className={`bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 relative overflow-hidden transition-all duration-500 ${highlightForm ? 'ring-4 ring-blue-300 shadow-blue-200' : ''}`}
        >
          {/* Animated Background Particles */}
          <ParticlesBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0" />
          
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 z-10"></div>
          
          <div className="relative z-10">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-sm">
                    <Shield size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-xs mx-auto">Thanks! I'll respond within 24 hours with answers and a detailed quote.</p>
                  <button 
                    onClick={() => setFormState('idle')} 
                    className="text-blue-600 font-bold hover:text-blue-700 underline text-lg transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* CONFIGURATION: Replace value="YOUR_ACCESS_KEY_HERE" with your actual Web3Forms Access Key */}
                  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClasses}>Name*</label>
                      <div className={inputContainerClasses}>
                        <User size={18} className={inputIconClasses} />
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required 
                            placeholder="Your name"
                            className={inputClasses}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>Email*</label>
                      <div className={inputContainerClasses}>
                        <Mail size={18} className={inputIconClasses} />
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            placeholder="your@email.com"
                            className={inputClasses}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone (Optional)</label>
                      <div className={inputContainerClasses}>
                        <Phone size={18} className={inputIconClasses} />
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="1234567890"
                            className={inputClasses}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="businessType" className={labelClasses}>Business Type*</label>
                      <div className={inputContainerClasses}>
                        <Briefcase size={18} className={inputIconClasses} />
                        <select 
                            id="businessType" 
                            name="businessType" 
                            required
                            className={inputClasses}
                        >
                            <option value="">Select an option</option>
                            <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                            <option value="Retail Store">Retail Store</option>
                            <option value="Home Services">Home Services (Plumbing, HVAC)</option>
                            <option value="Health & Wellness">Health & Wellness</option>
                            <option value="Professional Services">Professional Services</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="package" className={labelClasses}>Which Package?*</label>
                    <div className={inputContainerClasses}>
                        <Package size={18} className={inputIconClasses} />
                        <select 
                        id="package" 
                        name="package" 
                        required
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className={`${inputClasses} ${highlightForm ? 'border-blue-400 bg-blue-50/50' : ''}`}
                        >
                        <option value="">Select an option</option>
                        <option value="Starter Package ($199)">Starter Package ($199)</option>
                        <option value="Business Package ($399)">Business Package ($399)</option>
                        <option value="Growth Package ($999)">Growth Package ($999)</option>
                        <option value="Not Sure">Not Sure Yet / Need Advice</option>
                        </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>Tell Me About Your Business*</label>
                    <div className={inputContainerClasses}>
                        <MessageSquare size={18} className={`${inputIconClasses} top-6 -translate-y-0`} />
                        <textarea 
                        id="message" 
                        name="message" 
                        required 
                        rows={4}
                        placeholder="What does your business do? What do you need on your website?"
                        className={inputClasses}
                        ></textarea>
                    </div>
                  </div>

                  <div className="pt-2">
                    <MagnetizeButton 
                      type="submit" 
                      disabled={formState === 'submitting'} 
                      className="w-full py-6 text-lg font-bold"
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={20} /> Sending...
                        </span>
                      ) : "Send Message"}
                    </MagnetizeButton>
                  </div>
                  
                  {formState === 'error' && (
                    <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">❌ Oops! Please try again or email me directly.</p>
                  )}
                </form>
              )}
          </div>
        </motion.div>

        {/* Right Column: Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex items-start gap-5 group">
              <div className="bg-blue-100 p-4 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Email Me Directly</h3>
                <a href="mailto:hello@momentumweb.com" className="text-blue-600 hover:text-blue-700 font-medium text-lg border-b border-blue-200 hover:border-blue-600 transition-colors">hello@momentumweb.com</a>
                <p className="text-sm text-gray-500 mt-1">I respond to all emails within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="bg-purple-100 p-4 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Schedule a Call</h3>
                <p className="text-gray-600 mb-2">Prefer to talk? Book a free 30-minute consultation</p>
                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  calendly.com/momentumweb &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="bg-green-100 p-4 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Quick Response Promise</h3>
                <p className="text-gray-600 leading-relaxed">I know your time is valuable. You'll hear back from me within 24 hours, Monday-Friday.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <div className="bg-gray-100 p-4 rounded-xl text-gray-600 group-hover:bg-gray-800 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Privacy Notice</h3>
                <p className="text-gray-600 leading-relaxed">Your information is safe and never shared. I hate spam as much as you do.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/80 p-8 rounded-2xl border border-gray-200 backdrop-blur-sm">
            <h3 className="font-bold text-gray-900 mb-5 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              What Happens Next?
            </h3>
            <div className="space-y-4">
              {[
                "Send me your info using this form",
                "I'll email you within 24 hours",
                "We schedule a friendly 30-min call",
                "You get a custom quote and timeline",
                "If it feels right, we start building!"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                  <span className="w-7 h-7 rounded-full bg-white border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl text-center border border-blue-100/50">
                <p className="text-sm font-bold text-blue-800">No pressure. No hard sell. Just honest conversation.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
    </>
  );
};