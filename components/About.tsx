import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <Section id="about" className="py-24 overflow-hidden">
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="font-poppins flex flex-col-reverse md:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Left Image Section (Bottom on Mobile, Left on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 max-w-lg shrink-0 flex flex-col gap-8"
          >
              <div className="relative shadow-2xl shadow-indigo-600/20 rounded-2xl overflow-hidden aspect-[4/3] h-full">
                  <img 
                    className="w-full h-full object-cover rounded-2xl scale-100 hover:scale-105 transition-transform duration-700"
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                    alt="Momentum Web Workspace" 
                  />
                  <div className="absolute inset-0 bg-indigo-900/10 mix-blend-multiply"></div>
              </div>

              {/* Two Feature Blocks Below Image */}
              <div className="grid grid-cols-2 gap-6">
                  <div>
                      <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded-lg mb-4">
                          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png" alt="Fast" />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-1">Lightning Fast</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Built with speed — minimal load times and optimized.</p>
                  </div>
                  <div>
                      <div className="size-10 p-2 bg-purple-50 border border-purple-200 rounded-lg mb-4">
                          <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png" alt="Integrated" />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-1">Seamless Process</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">We handle everything from start to finish.</p>
                  </div>
              </div>
          </motion.div>

          {/* Right Text Section (Top on Mobile, Right on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm text-slate-600 max-w-lg w-full pt-4"
          >
              <h1 className="text-xl uppercase font-bold text-indigo-600 tracking-wider">Who We Are</h1>
              <div className="w-20 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-purple-400 mt-2 mb-6"></div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Small Team. Big Results.</h2>
              
              <div className="space-y-5 text-base leading-relaxed mb-8">
                  <p>
                      Momentum Web was born from a simple observation: Small businesses were getting left behind. 
                      Agencies were too expensive, and DIY builders were too complicated.
                  </p>
                  <p>
                      We changed that. We build high-performance websites that look expensive but don't cost a fortune.
                      When you work with us, you don't get a "ticket number" – you get personal attention.
                  </p>
              </div>

              {/* Meet the Team Section */}
              <div className="mb-8">
                 <h3 className="text-xl uppercase font-bold text-indigo-600 tracking-wider mb-4">Meet the Team</h3>
                 <div className="flex flex-col sm:flex-row gap-6">
                    {/* Rahul */}
                    <div className="flex items-center gap-3 group cursor-default">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-100 group-hover:border-indigo-500 transition-colors duration-300 shadow-sm">
                             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" alt="Rahul" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">Rahul</p>
                            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide">Founder & Dev</p>
                        </div>
                    </div>
                    
                    {/* Kavita */}
                    <div className="flex items-center gap-3 group cursor-default">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-purple-100 group-hover:border-purple-500 transition-colors duration-300 shadow-sm">
                             <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" alt="Kavita" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Kavita</p>
                            <p className="text-xs text-purple-600 font-bold uppercase tracking-wide">Lead Designer</p>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-3 mb-10">
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                      <span className="font-medium text-gray-700">No Outsourcing - We do everything in-house</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                      <span className="font-medium text-gray-700">Fair, Flat Pricing - No hidden surprises</span>
                  </div>
              </div>

              <div>
                  <Button href="#contact" className="rounded-full px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl shadow-indigo-200">
                      <span className="flex items-center gap-2">
                          Work With Us <ArrowRight size={16} />
                      </span>
                  </Button>
              </div>
          </motion.div>
      </div>
    </Section>
  );
};