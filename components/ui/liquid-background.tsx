"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

interface LiquidBackgroundProps {
  className?: string;
  color?: string;
}

export const LiquidBackground: React.FC<LiquidBackgroundProps> = ({ 
  className,
  color = "rgba(168, 85, 247, 0.4)" // Default purple glow
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      }
    };

    const points: { x: number; y: number; age: number; maxAge: number; size: number }[] = [];

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ('touches' in e) ? e.touches[0].clientX : (e as PointerEvent).clientX;
      const y = ('touches' in e) ? e.touches[0].clientY : (e as PointerEvent).clientY;
      
      mouse.current.x = x - rect.left;
      mouse.current.y = y - rect.top;
      mouse.current.active = true;

      // Add a liquid "drop"
      points.push({
        x: mouse.current.x,
        y: mouse.current.y,
        age: 0,
        maxAge: 60,
        size: Math.random() * 40 + 20
      });
    };

    const handlePointerLeave = () => {
      mouse.current.active = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient background for a subtle depth
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "rgba(11, 1, 24, 0)");
      bgGrad.addColorStop(0.5, "rgba(22, 8, 41, 0.2)");
      bgGrad.addColorStop(1, "rgba(11, 1, 24, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw active mouse glow
      if (mouse.current.active) {
        const glow = ctx.createRadialGradient(
          mouse.current.x, mouse.current.y, 0,
          mouse.current.x, mouse.current.y, 250
        );
        glow.addColorStop(0, color);
        glow.addColorStop(1, "rgba(168, 85, 247, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw "Liquid Ripples"
      ctx.globalCompositeOperation = "screen";
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age++;
        const alpha = 1 - p.age / p.maxAge;
        const radius = p.size * (1 + p.age * 0.05);

        if (p.age >= p.maxAge) {
          points.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `rgba(249, 115, 22, ${alpha * 0.3})`); // Orange liquid touch
        grad.addColorStop(1, "rgba(249, 115, 22, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("pointermove", handlePointerMove);
      parent.addEventListener("pointerleave", handlePointerLeave);
      parent.addEventListener("touchstart", handlePointerMove as any, { passive: true });
      parent.addEventListener("touchmove", handlePointerMove as any, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (parent) {
        parent.removeEventListener("pointermove", handlePointerMove);
        parent.removeEventListener("pointerleave", handlePointerLeave);
        parent.removeEventListener("touchstart", handlePointerMove as any);
        parent.removeEventListener("touchmove", handlePointerMove as any);
      }
      cancelAnimationFrame(animationId);
    };
  }, [color]);

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("absolute inset-0 pointer-events-none z-0", className)} 
      style={{ filter: "blur(40px)" }}
    />
  );
};
