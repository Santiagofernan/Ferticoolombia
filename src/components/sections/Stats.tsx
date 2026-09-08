import { AnimatePresence, motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, Package, MapPin } from "lucide-react";
import coffeeField from "@/assets/hero/h7.avif";
import coffeeFieldMobile from "@/assets/hero/h7-mobile.avif";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Stat {
  icon: typeof Calendar;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Calendar, value: 10, prefix: "+", label: "Años de experiencia" },
  { icon: Package, value: 50000, suffix: "+", label: "Toneladas distribuidas" },
  { icon: MapPin, value: 0, label: "Cobertura nacional" },
];

const departments = [
  "Huila",
  "Cauca",
  "Putumayo",
  "Caquetá",
  "Nariño",
  "Valle del Cauca",
  "Santander",
  "Atlántico",
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
  const [departmentIndex, setDepartmentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const rotationDelay = departments[departmentIndex] === "Valle del Cauca" ? 3000 : 5000;
    const timeout = window.setTimeout(() => {
      setDepartmentIndex((current) => (current + 1) % departments.length);
    }, rotationDelay);

    return () => window.clearTimeout(timeout);
  }, [departmentIndex]);

  return (
    <section
      ref={sectionRef}
      aria-label="Ferticoolombia en cifras"
      className="relative isolate overflow-hidden py-24 lg:py-32 min-h-[620px] lg:min-h-[720px] flex items-center"
    >
      {/* Fondo con parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <img
          src={coffeeField}
          srcSet={`${coffeeFieldMobile} 768w, ${coffeeField} 1920w`}
          sizes="100vw"
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
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
            Más de 10 años nutriendo el campo colombiano con respaldo técnico,
            cobertura nacional y aliados internacionales.
          </p>
        </motion.div>

        <div className="mx-auto grid w-full max-w-[1680px] gap-6 md:gap-8 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.1, 0.35), ease: EASE }}
              className="group flex flex-col items-center justify-center gap-3 md:gap-4 lg:gap-5 rounded-[24px] border border-white/20 dark:border-border/50 bg-white/10 dark:bg-surface/50 backdrop-blur-xl p-6 md:p-8 lg:p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/15 dark:hover:bg-surface/70 hover:border-primary-light/50 dark:hover:border-primary/30 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] dark:shadow-none overflow-hidden\"
            >
              <div className="inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-[16px] bg-primary-light/20 text-primary-light ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 shrink-0">
                <s.icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" strokeWidth={2} />
              </div>
              <div className="flex items-center justify-center w-full">
                {s.label === "Cobertura nacional" ? (
                  <div className="relative flex h-16 w-full items-center justify-center overflow-hidden md:h-20 lg:h-20" aria-live="polite">
                    <AnimatePresence initial={false} mode="wait">
                      {(() => {
                        const department = departments[departmentIndex];
                        const isLongDepartment = department.length > 12;
                        const isValleDelCauca = department === "Valle del Cauca";

                        return (
                          <motion.div
                            key={department}
                            initial={{ opacity: isValleDelCauca ? 1 : 0, x: isLongDepartment ? "100%" : 36 }}
                            animate={
                              isLongDepartment
                                ? { opacity: 1, x: isValleDelCauca ? ["100%", "0%", "0%"] : ["100%", "0%", "-100%"] }
                                : { opacity: 1, x: 0 }
                            }
                            exit={{ opacity: isValleDelCauca ? 1 : 0, x: -36 }}
                            transition={
                              isLongDepartment
                                ? {
                                    duration: isValleDelCauca ? 3 : 4.6,
                                    times: isValleDelCauca ? [0, 0.5, 1] : undefined,
                                    ease: "linear",
                                  }
                                : { duration: 0.65, ease: EASE }
                            }
                            className={`absolute inset-x-0 flex items-center justify-center whitespace-nowrap font-display font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] ${
                              isLongDepartment ? "text-xl md:text-2xl lg:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"
                            }`}
                          >
                            {department}
                          </motion.div>
                        );
                      })()}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] md:text-4xl lg:text-5xl">
                    {s.prefix}
                    <Counter to={s.value} />
                    {s.suffix}
                  </div>
                )}
              </div>
              <div className="text-xs md:text-sm lg:text-base uppercase tracking-[0.2em] text-white/90">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
