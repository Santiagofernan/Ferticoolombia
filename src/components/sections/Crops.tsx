const EASE = [0.22, 1, 0.36, 1] as const;
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { crops } from "@/data/crops";
import { products } from "@/data/products";

function productName(slug: string) {
  return products.find((p) => p.slug === slug)?.name ?? slug;
}

export function Crops() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = crops.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, 5000);
    return () => window.clearInterval(id);
  }, [total]);

  const current = crops[index];

  return (
    <section id="cultivos" className="section-fc relative overflow-hidden">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xl font-semibold uppercase tracking-[0.2em] text-primary-light">
            Cultivos que nutrimos
          </span>
          <h2 className="mt-4 font-display">
            Programas nutricionales por cultivo
          </h2>
          <p className="mt-5 text-lg">
            Acompañamos al agricultor colombiano con soluciones específicas para
            los cultivos que sostienen el campo del país.
          </p>
        </motion.div>

        <div className="relative">

          {/* Carrusel */}
          <div className="relative overflow-hidden rounded-[24px] border border-border bg-card shadow-[var(--shadow-soft)]">

            <div  className="relative h-[430px] sm:h-[480px] md:h-[520px] lg:h-[560px] w-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current.slug}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0"
                >
                  <img
                    src={current.image}
                    alt={`Cultivo de ${current.name}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-14 lg:p-16 max-w-3xl">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-[var(--shadow-soft)]">
                      <Sprout className="h-3.5 w-3.5" strokeWidth={2.5} />
                      {current.accent}
                    </div>
                    <h3 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                      {current.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-[15px] md:text-base leading-relaxed text-white/90">
                      {current.description}
                    </p>

                    <div className="mt-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                        Productos recomendados
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {current.recommended.map((slug) => (
                          <a
                            key={slug}
                            href="#productos"
                            className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/20"
                          >
                            {productName(slug)}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:gap-3 hover:bg-primary-dark"
                      >
                        Solicitar asesoría
                        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Indicadores / miniaturas */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {crops.map((c, i) => {
              const active = i === index;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Ver cultivo ${c.name}`}
                  aria-current={active}
                  className={`group relative flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                      : "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      active ? "bg-primary-foreground" : "bg-primary/50"
                    }`}
                  />
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}