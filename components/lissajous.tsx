"use client";

import { useEffect, useRef } from "react";

const TWO_PI = Math.PI * 2;

function curvePoint(t: number) {
  return {
    x: Math.sin(6 * t + Math.PI / 5),
    y: Math.sin(5 * t),
  };
}

export function Lissajous({ size = 180 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const pad = 16;
    const r = (size - pad * 2) / 2;
    const cx = size / 2;
    const cy = size / 2;

    const project = (t: number) => {
      const p = curvePoint(t);
      return { x: cx + r * p.x, y: cy + r * p.y };
    };

    const drawCurve = () => {
      const steps = 700;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const { x, y } = project((i / steps) * TWO_PI);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawDot = (t: number) => {
      const trail = 30;
      const step = 0.05;
      for (let i = trail; i > 0; i--) {
        const { x, y } = project(t - i * step);
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, TWO_PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${(1 - i / trail) * 0.55})`;
        ctx.fill();
      }

      const head = project(t);
      ctx.save();
      ctx.shadowBlur = 14;
      ctx.shadowColor = "rgba(255, 255, 255, 0.95)";
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.6, 0, TWO_PI);
      ctx.fill();
      ctx.restore();
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      drawCurve();
      drawDot(0);
      return;
    }

    let raf = 0;
    let t = 0;
    let last = performance.now();
    const speed = 0.85;

    const render = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t = (t + speed * dt) % TWO_PI;

      ctx.clearRect(0, 0, size, size);
      drawCurve();
      drawDot(t);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <figure className="shrink-0">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="block"
        style={{ width: size, height: size }}
      />
      <figcaption className="mt-1.5 font-mono text-[10px] leading-tight text-muted/70">
        Lissajous curve · x = sin(6t + π/5), y = sin(5t)
      </figcaption>
    </figure>
  );
}
