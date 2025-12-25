"use client" 

import * as React from "react"
import { cn } from "../../lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Magnet } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "./shadcn-button";

export type MagnetizeButtonProps = React.ComponentProps<typeof Button> & {
  particleCount?: number;
  attractRadius?: number;
}

interface Particle {
    id: number;
    x: number;
    y: number;
}

export function MagnetizeButton({
    className,
    particleCount = 12,
    attractRadius = 50,
    children,
    ...props
}: MagnetizeButtonProps) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        });
    }, [particlesControl]);

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false);
        await particlesControl.start((i) => ({
            x: particles[i].x,
            y: particles[i].y,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }));
    }, [particlesControl, particles]);

    return (
        <Button
            className={cn(
                "min-w-40 relative touch-none overflow-visible group",
                "bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-lg shadow-blue-500/20",
                "transition-all duration-300",
                className
            )}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            {...props}
        >
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: particles[index].x, y: particles[index].y }}
                    animate={particlesControl}
                    className={cn(
                        "absolute w-1.5 h-1.5 rounded-full",
                        "bg-blue-300",
                        "transition-opacity duration-300 pointer-events-none",
                        isAttracting ? "opacity-100" : "opacity-0"
                    )}
                />
            ))}
            <span className="relative w-full flex items-center justify-center gap-2 z-10">
                <Magnet
                    className={cn(
                        "w-4 h-4 transition-transform duration-300 group-hover:rotate-12",
                        isAttracting && "scale-110"
                    )}
                />
                {children || (isAttracting ? "Attracting" : "Hover me")}
            </span>
        </Button>
    );
}