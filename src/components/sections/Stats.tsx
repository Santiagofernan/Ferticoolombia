import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import { Calendar, Package, Users, MapPin } from "lucide-react";
import coffeeField from "@/assets/stats/coffee-field.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Stat {
  icon: typeof Calendar;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Calendar, value: 20, prefix: "+", label: "Años de experiencia" },
  { icon: Package, value: 50000, suffix: "+", label: "Toneladas distribuidas" },
  { icon: Users, value: 1500, suffix: "+", label: "Clientes activos" },
  { icon: MapPin, value: 100, suffix: "%", label: "Cobertura nacional" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("es-CO"),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 2.2, ease: EASE });
    return controls.stop;
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref}>0</span>;
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      aria-label="Ferticolombia en cifras"
      className="relative isolate overflow-hidden py-24 lg:py-32 min-h-[620px] lg:min-h-[720px] flex items-center"
    >
      {/* Fondo con parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <img
          src={coffeeField}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        <div className="absolute inset-0 bg-primary-dark/35 mix-blend-multiply" />
      </motion.div>

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 xl:px-20 max-w-[1560px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
            Trayectoria y experiencia
          </span>
          <h2 className="mt-6 font-display text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            Resultados que respaldan{" "}
            <span className="text-primary-light">cada cosecha</span>
          </h2>
          <p className="mt-5 text-lg text-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Más de dos décadas nutriendo el campo colombiano con respaldo técnico,
            cobertura nacional y aliados internacionales.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.1, 0.35), ease: EASE }}
              className="group flex flex-col items-center justify-between rounded-[24px] border border-white/20 bg-white/10 backdrop-blur-xl p-9 md:p-10 lg:p-12 text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 hover:border-primary-light/50 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] min-h-[340px] md:min-h-[380px] lg:min-h-[420px]"
            >
              <div className="inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-[16px] bg-primary-light/20 text-primary-light ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 shrink-0">
                <s.icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2} />
              </div>
              <div className="flex-1 flex items-center justify-center w-full py-4">
                <div className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-none tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
                  {s.prefix}
                  <Counter to={s.value} />
                  {s.suffix}
                </div>
              </div>
              <div className="text-sm md:text-base uppercase tracking-[0.2em] text-white/90 shrink-0">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
