'use client';

import { useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const KEYWORDS = [
  { text: 'Anxiety', cat: 'dark' },
  { text: 'Stress', cat: 'dark' },
  { text: 'Insomnia', cat: 'dark' },
  { text: 'Depression', cat: 'dark' },
  { text: 'Overwhelm', cat: 'dark' },
  { text: 'Burnout', cat: 'dark' },
  { text: 'Trigger', cat: 'dark' },
  { text: 'Mindfulness', cat: 'light' },
  { text: 'Healing', cat: 'light' },
  { text: 'Balance', cat: 'light' },
  { text: 'Serenity', cat: 'light' },
  { text: 'Resilience', cat: 'light' },
  { text: 'Therapy', cat: 'light' },
  { text: 'Support', cat: 'light' },
  { text: 'Growth', cat: 'light' },
  { text: 'Peace', cat: 'light' },
  { text: 'Trust', cat: 'light' },
  { text: 'Calm', cat: 'light' },
  { text: 'Strength', cat: 'light' },
  { text: 'Clarity', cat: 'light' },
  { text: 'Hope', cat: 'light' },
  { text: 'Wellness', cat: 'light' },
  { text: 'Connection', cat: 'light' },
  { text: 'Thrive', cat: 'light' },
  { text: 'Breathe', cat: 'light' },
];

function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function rng(min: number, max: number, rand: () => number) {
  return min + rand() * (max - min);
}

interface WordDef {
  text: string;
  cat: string;
  x0: number;
  y0: number;
  z0: number;
  xf: number;
  yf: number;
  zf: number;
  size: number;
  delay: number;
  fadeStart: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function getThemeColors() {
  if (typeof window === 'undefined') {
    return {
      primary: { r: 180, g: 140, b: 90 },
      accent: { r: 220, g: 190, b: 140 },
    };
  }

  const styles = getComputedStyle(document.documentElement);
  const primary = styles.getPropertyValue('--primary').trim() || '#003262';
  const accent = styles.getPropertyValue('--accent').trim() || '#003262';

  return {
    primary: hexToRgb(primary),
    accent: hexToRgb(accent),
  };
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  words: WordDef[],
  progress: number
) {
  const FOV = 520;
  const cx = W / 2;
  const cy = H / 2;
  const theme = getThemeColors();

  ctx.clearRect(0, 0, W, H);

  const items = words
    .map((w) => {
      const p = Math.max(
        0,
        Math.min(1, (progress - w.delay) / Math.max(0.001, 1 - w.delay))
      );

      const e = easeInOut(p);

      const x = lerp(w.x0, w.xf, e);
      const y = lerp(w.y0, w.yf, e);
      const z = lerp(w.z0, w.zf, e);
      const scale = FOV / (FOV + z);

      return { w, x, y, z, scale, e };
    })
    .sort((a, b) => a.z - b.z);

  items.forEach(({ w, x, y, scale, e }) => {
    const sx = cx + x * cx * scale;
    const sy = cy + y * cy * scale;

    if (sx < -300 || sx > W + 300 || sy < -300 || sy > H + 300) return;

    const fs = Math.max(10, w.size * scale);
    ctx.font = `300 ${fs}px 'Cormorant Garamond', Georgia, serif`;

    let alpha: number;
    if (progress > w.fadeStart) {
      alpha = Math.max(
        0,
        1 - (progress - w.fadeStart) / Math.max(0.001, 1 - w.fadeStart)
      );
    } else {
      alpha = Math.min(1, e * 2);
    }

    const c = w.cat === 'dark' ? theme.accent : theme.primary;

    ctx.globalAlpha = alpha * 0.88;
    ctx.fillStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
    ctx.fillText(w.text, sx, sy);
    ctx.globalAlpha = 1;
  });
}

export function KineticTypography() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 58,
    damping: 20,
    restDelta: 0.001,
  });

  const msgOpacity = useTransform(smooth, [0.7, 0.84], [0, 1]);
  const msgY = useTransform(smooth, [0.7, 0.87], [36, 0]);
  const subOpacity = useTransform(smooth, [0.8, 0.94], [0, 1]);
  const hintOpacity = useTransform(smooth, [0, 0.12], [1, 0]);
  const barWidth = useTransform(smooth, [0, 1], ['0%', '100%']);

  const words = useMemo<WordDef[]>(
    () =>
      KEYWORDS.map((kw, i) => {
        const rand = seededRng(i * 137 + 42);

        return {
          text: kw.text,
          cat: kw.cat,
          x0: rng(-2.8, 2.8, rand),
          y0: rng(-2.8, 2.8, rand),
          z0: rng(-900, -80, rand),
          xf: rng(-0.55, 0.55, rand),
          yf: rng(-0.4, 0.4, rand),
          zf: rng(-30, 55, rand),
          size: rng(16, 48, rand),
          delay: rng(0, 0.42, rand),
          fadeStart: rng(0.68, 0.88, rand),
        };
      }),
    []
  );

  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawFrame(
      ctx,
      canvas.width / window.devicePixelRatio,
      canvas.height / window.devicePixelRatio,
      words,
      progressRef.current
    );

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [words]);

  useEffect(() => {
    const unsub = smooth.on('change', (v) => {
      progressRef.current = v;
    });

    return unsub;
  }, [smooth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement!;
    const dpr = window.devicePixelRatio || 1;

    const setSize = (w: number, h: number) => {
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize(parent.offsetWidth, parent.offsetHeight);

    const obs = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setSize(width, height);
    });

    obs.observe(parent);
    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [renderLoop]);

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', height: '250vh' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, var(--background) 0%, var(--card) 45%, var(--secondary) 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05))',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.03))',
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            width: '100%',
            height: '100%',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <motion.h2
            style={{ opacity: msgOpacity, y: msgY }}
            className="kt-heading"
          >
            Your healing journey
            <br />
            starts with understanding
          </motion.h2>

          <motion.p
            className="kt-sub"
            style={{ opacity: subOpacity }}
          >
            Compassion-led support · Built for trust
          </motion.p>
        </div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 30,
            height: 3,
            width: barWidth,
            background:
              'linear-gradient(90deg, var(--accent), var(--primary), var(--accent))',
          }}
        />

        <motion.p
          className="kt-hint"
          style={{
            opacity: hintOpacity,
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
          }}
        >
          Scroll to explore
        </motion.p>

        <style>{`
          .kt-heading {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(34px, 5.8vw, 64px);
            font-weight: 300;
            color: rgba(60, 70, 120, 0.85);
            line-height: 1.12;
            letter-spacing: 0.01em;
            max-width: 760px;
          }

          .kt-sub {
            margin-top: 20px;
            font-family: 'DM Sans', sans-serif;
            font-size: 12px;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: rgba(60, 70, 120, 0.85);
          }

          .kt-hint {
            font-family: 'DM Sans', sans-serif;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(60, 70, 120, 0.85);
          }
        `}</style>
      </div>
    </section>
  );
}