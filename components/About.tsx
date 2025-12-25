
import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const popVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
            type: "spring",
            stiffness: 260,
            damping: 20
        } 
    }
};

export const About: React.FC = () => {
  return (
    <Section id="about" className="py-32 overflow-hidden px-6">
      <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
              
              {/* Left Column: Visuals */}
              <div className="relative">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl"
                  >
                      {/* Removed grayscale to make the image colorful as requested */}
                      <img 
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                        alt="Momentum Digital Strategy Session"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      
                      {/* Floating Stats */}
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl flex justify-between items-center"
                      >
                          <div className="text-center">
                              <p className="text-3xl font-display font-black text-accent">98%</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted">ROI Growth</p>
                          </div>
                          <div className="w-[1px] h-10 bg-white/10" />
                          <div className="text-center">
                              <p className="text-3xl font-display font-black text-white">10D</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted">Delivery</p>
                          </div>
                          <div className="w-[1px] h-10 bg-white/10" />
                          <div className="text-center">
                              <p className="text-3xl font-display font-black text-primary">24/7</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted">Ownership</p>
                          </div>
                      </motion.div>
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] -z-10" />
                  <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/20 rounded-full blur-[100px] -z-10" />
              </div>

              {/* Right Column: Content */}
              <div className="space-y-12">
                  <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Our Origin Story</span>
                      <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                          Propelling <br /> <span className="text-outline">Ambition.</span>
                      </h2>
                  </motion.div>

                  <motion.p 
                    variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="text-xl md:text-2xl text-muted font-medium leading-relaxed max-w-xl"
                  >
                      Momentum Digital was founded on a singular premise: Great businesses deserve world-class digital assets without the traditional agency friction.
                  </motion.p>

                  <div className="grid sm:grid-cols-2 gap-8">
                      <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                              <Award size={24} />
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase italic">Zero Rent Policy</h4>
                          <p className="text-muted text-sm font-medium">We don't believe in holding your site hostage. You pay once, you own the code forever.</p>
                      </motion.div>
                      <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <Zap size={24} />
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase italic">Speed as Strategy</h4>
                          <p className="text-muted text-sm font-medium">Performance isn't an afterthought. It's our primary competitive advantage.</p>
                      </motion.div>
                  </div>

                  {/* Enhanced Team Display with pop effects */}
                  <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="pt-8 border-t border-white/5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Built by Founders</p>
                      <div className="flex flex-wrap gap-12">
                          <motion.div 
                              variants={popVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.1, rotate: 2 }}
                              className="flex items-center gap-4 group cursor-pointer"
                          >
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent transition-colors shadow-xl">
                                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" className="w-full h-full object-cover" alt="Founder Rahul" />
                              </div>
                              <div>
                                  <p className="text-white font-black text-lg">Rahul</p>
                                  <p className="text-xs font-black uppercase tracking-widest text-muted">Dev Lead</p>
                              </div>
                          </motion.div>
                          <motion.div 
                              variants={popVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.1, rotate: -2 }}
                              transition={{ delay: 0.1 }}
                              className="flex items-center gap-4 group cursor-pointer"
                          >
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors shadow-xl">
                                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" className="w-full h-full object-cover" alt="Founder Kavita" />
                              </div>
                              <div>
                                  <p className="text-white font-black text-lg">Kavita</p>
                                  <p className="text-xs font-black uppercase tracking-widest text-muted">Design Lead</p>
                              </div>
                          </motion.div>
                      </div>
                  </motion.div>

                  <motion.div variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                      <Button href="#contact" variant="accent" className="rounded-full px-10 group">
                          Join the Momentum <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                  </motion.div>
              </div>
          </div>
      </div>
    </Section>
  );
};
