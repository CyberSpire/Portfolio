import React from 'react';
import { Rocket } from 'lucide-react';

export const Footer: React.FC = () => {
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // For Home link which is usually just '#' or top of page
    if (href === '#' || href === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <Rocket size={20} />
              </div>
              <span className="text-xl font-bold">Momentum Web</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Professional websites for small businesses. Fast delivery, honest pricing, no monthly fees.
            </p>
            <p className="text-gray-500 text-sm">© 2024 Momentum Web. All rights reserved.</p>
          </div>

          {/* Middle Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#portfolio" onClick={(e) => handleSmoothScroll(e, '#portfolio')} className="hover:text-blue-400 transition-colors">Portfolio</a></li>
              <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')} className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#faq" onClick={(e) => handleSmoothScroll(e, '#faq')} className="hover:text-blue-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Website Design</li>
              <li>Website Development</li>
              <li>Local SEO</li>
              <li>E-commerce Setup</li>
              <li>Training & Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-xs text-gray-500">
            Built with React & Tailwind CSS | Hosted on Vercel | Fast, Secure, Modern
          </p>
        </div>
      </div>
    </footer>
  );
};