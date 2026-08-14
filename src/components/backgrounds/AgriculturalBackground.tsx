import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export interface AgriculturalBackgroundProps {
  /** Base particle count (desktop). Mobile automatically uses ~45%. */
  particleCount?: number;
  /** Multiplier for particle drift speed. 1 = default (slow). */
  particleSpeed?: number;
  /** Global movement amplitude multiplier. */
  intensity?: number;
  /** Global opacity of the whole background layer. */
  opacity?: number;
  /** Parallax strength on scroll. 0 disables parallax. */
  parallaxSpeed?: number;
  leaves?: boolean;
  clouds?: boolean;
  className?: string;
}

/** Deterministic pseudo-random so SSR and client render the same layout. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        d="M21 3c0 9-6.5 15-15 15-1 0-2-.1-3-.4C4.5 9.7 11 4 21 3Z"
        fill="currentColor"
      />
      <path
        d="M3 21c3-6 8-10 14-12"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function AgriculturalBackground({
  particleCount = 26,
  particleSpeed = 1,
  intensity = 1,
  opacity = 1,
  parallaxSpeed = 1,
  leaves = true,
  clouds = true,
  className = "",
}: AgriculturalBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Prevent SSR/client hydration mismatches by rendering a minimal
  // placeholder during SSR and until the component is mounted on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const p = reduce ? 0 : Math.max(0, parallaxSpeed) * (isMobile ? 0.68 : 1);
  const motionFactor = isMobile ? 0.55 : 1;
  const globalIntensity = reduce ? Math.min(intensity, 0.75) : intensity;

  const yFar = useTransform(scrollYProgress, [0, 1], [`${-2 * p}%`, `${2 * p}%`]);
  const yMid = useTransform(scrollYProgress, [0, 1], [`${-5 * p}%`, `${5 * p}%`]);
  const yNear = useTransform(scrollYProgress, [0, 1], [`${-10 * p}%`, `${10 * p}%`]);

  const count = useMemo(
    () => Math.max(8, Math.round(particleCount * (isMobile ? 0.38 : 1))),
    [particleCount, isMobile],
  );
  const leafCount = useMemo(() => (leaves ? (isMobile ? 3 : 6) : 0), [leaves, isMobile]);
  const cloudCount = useMemo(() => (clouds ? (isMobile ? 2 : 3) : 0), [clouds, isMobile]);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: rand(i + 1) * 100,
        top: rand(i + 51) * 100,
        size: 1.8 + rand(i + 101) * 3.4,
        driftX: (2 + rand(i + 151) * 7) * globalIntensity * motionFactor,
        driftY: (0.6 + rand(i + 201) * 1.4) * globalIntensity * motionFactor,
        duration: (18 + rand(i + 251) * 18) / Math.max(0.3, particleSpeed * (isMobile ? 1.15 : 1)),
        delay: rand(i + 301) * -14,
        glow: rand(i + 351) > 0.78,
        direction: rand(i + 401) > 0.5 ? 1 : -1,
        alpha: 0.12 + rand(i + 451) * 0.42,
      })),
    [count, globalIntensity, particleSpeed, isMobile],
  );

  const leafItems = useMemo(
    () =>
      Array.from({ length: leafCount }, (_, i) => ({
        top: 6 + rand(i + 501) * 82,
        size: 16 + rand(i + 551) * 24,
        duration: (30 + rand(i + 601) * 22) / Math.max(0.35, particleSpeed * (isMobile ? 1.05 : 1)),
        delay: rand(i + 651) * -24,
        sway: 8 + rand(i + 701) * 14,
        tilt: 8 + rand(i + 751) * 14,
        depth: rand(i + 801),
      })),
    [leafCount, particleSpeed, isMobile],
  );

  const cloudItems = useMemo(
    () =>
      Array.from({ length: cloudCount }, (_, i) => ({
        top: 4 + rand(i + 901) * 32,
        width: 220 + rand(i + 951) * 300,
        height: 46 + rand(i + 1001) * 40,
        duration: (120 + rand(i + 1051) * 74) / Math.max(0.4, particleSpeed * (isMobile ? 1.05 : 1)),
        delay: rand(i + 1101) * -72,
        alpha: 0.08 + rand(i + 1151) * 0.12,
        offset: rand(i + 1201) * 20 - 10,
      })),
    [cloudCount, particleSpeed, isMobile],
  );

  if (!mounted) {
    return (
      <div
        ref={ref}
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
        style={{ opacity, zIndex: 0 }}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      style={{ opacity, zIndex: 0 }}
    >
      {/* 1 — Base agrícola: campo, tierra y cielo muy sutiles */}
      <motion.div style={{ y: yFar }} className="absolute -inset-y-[8%] inset-x-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.985 0.012 145) 0%, oklch(0.975 0.018 130) 42%, oklch(0.955 0.028 95) 78%, oklch(0.94 0.035 80) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 60% at 18% 8%, oklch(0.73 0.16 145 / 0.10), transparent 60%), radial-gradient(100% 55% at 84% 14%, oklch(0.83 0.16 85 / 0.09), transparent 62%), radial-gradient(120% 70% at 50% 108%, oklch(0.41 0.12 145 / 0.16), transparent 68%)",
          }}
        />
        {/* Colinas / surcos del campo */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[46%] w-full"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
        >
          <path
            d="M0 250 C 220 190 360 300 620 250 C 880 200 1060 300 1440 230 L1440 420 L0 420Z"
            fill="oklch(0.52 0.14 145 / 0.10)"
          />
          <path
            d="M0 320 C 260 270 420 360 720 316 C 1010 272 1220 348 1440 300 L1440 420 L0 420Z"
            fill="oklch(0.41 0.12 145 / 0.12)"
          />
        </svg>
      </motion.div>

      {/* 6 — Nubes en desplazamiento horizontal lento */}
      {cloudItems.map((c, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute will-change-transform"
          style={{
            top: `${Number(c.top).toFixed(4)}%`,
            width: `${Number(c.width).toFixed(3)}px`,
            height: `${Number(c.height).toFixed(3)}px`,
            left: "-40%",
            borderRadius: "9999px",
            filter: "blur(38px)",
            background: `oklch(1 0 0 / ${c.alpha})`,
            y: yFar,
          }}
          animate={reduce ? undefined : { x: ["0%", "260%"] }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* 4 — Elementos agrícolas en distintas profundidades (siluetas de trigo/espigas) */}
      <motion.div style={{ y: yMid }} className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-[6%] h-[26%] opacity-[0.10]"
          viewBox="0 0 60 200"
          fill="none"
        >
          <path d="M30 200V60" stroke="oklch(0.41 0.12 145)" strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k}>
              <ellipse cx="20" cy={60 + k * 22} rx="10" ry="6" fill="oklch(0.52 0.14 145)" transform={`rotate(-25 20 ${60 + k * 22})`} />
              <ellipse cx="40" cy={70 + k * 22} rx="10" ry="6" fill="oklch(0.52 0.14 145)" transform={`rotate(25 40 ${70 + k * 22})`} />
            </g>
          ))}
        </svg>
        <svg
          className="absolute bottom-0 right-[10%] h-[34%] opacity-[0.08]"
          viewBox="0 0 60 200"
          fill="none"
        >
          <path d="M30 200V40" stroke="oklch(0.41 0.12 145)" strokeWidth="3" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <g key={k}>
              <ellipse cx="19" cy={45 + k * 24} rx="11" ry="6" fill="oklch(0.62 0.16 145)" transform={`rotate(-28 19 ${45 + k * 24})`} />
              <ellipse cx="41" cy={56 + k * 24} rx="11" ry="6" fill="oklch(0.62 0.16 145)" transform={`rotate(28 41 ${56 + k * 24})`} />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* 2 + 5 — Partículas (semillas / polvo) y destellos luminosos */}
      <motion.div style={{ y: yNear }} className="absolute inset-0">
        {particles.map((s, i) => (
          <motion.span
            key={`p-${i}`}
            className="absolute rounded-full will-change-transform"
            style={{
                left: `${Number(s.left).toFixed(4)}%`,
                top: `${Number(s.top).toFixed(4)}%`,
                width: `${Number(s.size).toFixed(5)}px`,
                height: `${Number(s.size).toFixed(5)}px`,
              background: s.glow
                ? `oklch(0.95 0.09 100 / ${s.alpha})`
                : `oklch(0.46 0.07 90 / ${s.alpha})`,
                boxShadow: s.glow ? `0 0 ${Number(s.size * 1.8).toFixed(5)}px oklch(0.83 0.16 85 / ${s.alpha * 0.65})` : undefined,
            }}
            animate={
              reduce
                ? undefined
                : {
                    x: [0, s.driftX * s.direction, -s.driftX * s.direction * 0.4, 0],
                    y: [0, s.driftY * -1, -s.driftY * 0.4, 0],
                    opacity: [0.1, s.alpha, 0.25, 0.1],
                  }
            }
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* 3 — Hojas verdes con brisa de izquierda a derecha */}
      <motion.div style={{ y: yNear }} className="absolute inset-0">
        {leafItems.map((l, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute will-change-transform"
            style={{ top: `${Number(l.top).toFixed(4)}%`, left: "-12%" }}
            animate={
              reduce
                ? undefined
                : {
                    x: ["0vw", "102vw", "106vw", "118vw"],
                    opacity: [0.18, 0.95, 0.95, 0.18],
                  }
            }
            transition={{
              duration: l.duration,
              delay: l.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, -l.sway, l.sway * 0.6, 0],
                      rotate: [0, l.tilt * (l.depth > 0.5 ? 1.1 : 0.85), 0],
                    }
              }
              transition={{
                duration: l.duration / 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Leaf
                className="block"
                {...{
                  style: {
                    width: l.size,
                    height: l.size,
                    color:
                      l.depth > 0.6
                        ? "oklch(0.68 0.17 135 / 0.34)"
                        : "oklch(0.52 0.14 145 / 0.24)",
                  },
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Velo final para garantizar legibilidad */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(245,244,240,0.10) 28%, rgba(255,255,255,0.06) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default AgriculturalBackground;
