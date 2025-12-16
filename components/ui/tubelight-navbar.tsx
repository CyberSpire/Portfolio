"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  isScrolled?: boolean
}

export function NavBar({ items, className, isScrolled = false }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // ScrollSpy Logic
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Trigger earlier

      // Check for Home (Top of page)
      if (window.scrollY < 100) {
        if (items[0] && activeTab !== items[0].name) {
          setActiveTab(items[0].name);
        }
        return;
      }

      // Check other sections
      for (const item of items) {
        // Skip home link '#' or generic '/'
        if (item.url === '#' || item.url === '/') continue;
        
        const targetId = item.url.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            if (activeTab !== item.name) {
              setActiveTab(item.name);
            }
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Initial check
    handleScrollSpy();
    
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [items, activeTab]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    setActiveTab(name);
    
    // Smooth scroll logic
    const targetId = href.replace(/^#/, '');
    const element = document.getElementById(targetId);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
    } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 w-full max-w-fit pointer-events-none",
        className,
      )}
    >
      <div className={cn(
          "pointer-events-auto flex items-center gap-3 py-1 px-1 rounded-full shadow-xl transition-all duration-300 ease-in-out border backdrop-blur-xl",
          isScrolled 
            ? "bg-white/80 border-gray-200/50 shadow-blue-900/5" 
            : "bg-black/20 border-white/10 shadow-black/10"
      )}>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleScroll(e, item.url, item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors duration-300",
                isScrolled
                    ? (isActive ? "text-blue-600 bg-gray-100" : "text-gray-600 hover:text-blue-600 hover:bg-gray-100/50")
                    : (isActive ? "text-blue-400 bg-white/10" : "text-gray-200 hover:text-white hover:bg-white/5")
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={cn(
                      "absolute inset-0 w-full rounded-full -z-10",
                      isScrolled ? "bg-blue-600/5" : "bg-blue-400/5"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className={cn(
                      "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full transition-colors duration-300",
                      isScrolled ? "bg-blue-600" : "bg-blue-400"
                  )}>
                    <div className={cn(
                        "absolute w-12 h-6 rounded-full blur-md -top-2 -left-2 transition-colors duration-300",
                         isScrolled ? "bg-blue-600/20" : "bg-blue-400/20"
                    )} />
                    <div className={cn(
                        "absolute w-8 h-6 rounded-full blur-md -top-1 transition-colors duration-300",
                         isScrolled ? "bg-blue-600/20" : "bg-blue-400/20"
                    )} />
                    <div className={cn(
                        "absolute w-4 h-4 rounded-full blur-sm top-0 left-2 transition-colors duration-300",
                         isScrolled ? "bg-blue-600/20" : "bg-blue-400/20"
                    )} />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}