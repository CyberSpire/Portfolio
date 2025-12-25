
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { FloatingShapes } from './components/ui/FloatingShapes';
import { CustomCursor } from './components/ui/CustomCursor';
import { RotatingBadge } from './components/ui/RotatingBadge';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative selection:bg-accent/30">
      <CustomCursor />
      <RotatingBadge />
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Features />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
