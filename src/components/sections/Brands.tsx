import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import plantInterior from "@/assets/brands/plant-interior.avif";
import plant4 from "@/assets/brands/plant-4.avif";
import plant5 from "@/assets/brands/plant-5.avif";
import plant6 from "@/assets/brands/plant-6.avif";
import plant7 from "@/assets/brands/plant-7.avif";
import logistics1 from "@/assets/brands/logistics-1.avif";
import logistics2 from "@/assets/brands/logistics-2.avif";
import logistics4 from "@/assets/brands/logistics-4.avif";
import fertilizerHold from "@/assets/brands/fertilizer-hold.webp";
import acronLogo from "@/assets/brands/acron.avif";
import coocentralLogo from "@/assets/brands/coocentral.svg";
import logoIcon from "@/assets/brand/logo-icon.avif";

const EASE = [0.22, 1, 0.36, 1] as const;

type Brand = {
  name: string;
  tagline?: string;
  logo: string;
  url: string;
  logoClassName?: string;
};

const brands: Brand[] = [
  {
    name: "Acron",
    tagline: "Fertilizantes nitrogenados y complejos",
    logo: acronLogo,
    url: "https://www.acron.ru/en/the-geography-of-business/acron-colombia-s-a-s/",
    logoClassName: "max-h-28 md:max-h-32",
  },
  {
    name: "Coocentral",
    tagline: "Aliado nacional cooperativo",
    logo: coocentralLogo,
    url: "https://coocentral.com/",
    logoClassName: "max-h-40 md:max-h-44 lg:max-h-48"
  },
];

const backgroundImages = [
  logistics4,
  plant4,
  fertilizerHold,
  plantInterior,
  logistics1,
  plant5,
  logistics2,
  plant6,
  plant7,
];

export function Brands() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marcas"
      aria-label="Marcas aliadas de Ferticoolombia"
      className="relative isolate overflow-hidden bg-primary-dark py-24 lg:py-32 min-h-[640px] lg:min-h-[760px] flex items-center"
    >
      {/* Carrusel de fondo con parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={current}
            src={backgroundImages[current]}
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: 6, ease: "easeOut" } }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Overlay: gradiente para legibilidad, manteniendo detalles */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-primary-dark/25 mix-blend-multiply" />
      </motion.div>

      {/* Marca de agua corporativa */}
      <img
        src={logoIcon}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 w-32 md:w-44 opacity-[0.07] brightness-0 invert select-none"
      />

      <div className="container-fc relative z-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Alianzas estratégicas
          </span>
          <h2 className="mt-6 font-display text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
            Respaldados por las mejores{" "}
            <span className="text-primary-light">marcas del mundo</span>
          </h2>
          <p className="mt-5 text-lg text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Trabajamos con proveedores globales líderes en nutrición vegetal
            para garantizar calidad, trazabilidad y respaldo técnico.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {brands.map((b, i) => (
            <motion.li
              key={b.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: Math.min(i * 0.1, 0.35),
                ease: EASE,
              }}
            >
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar sitio oficial de ${b.name} (se abre en nueva pestaña)`}
                className="group relative flex h-full flex-col rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/50 p-7 md:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/95 hover:shadow-[0_35px_80px_-20px_rgba(0,0,0,0.6)] hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div className="pointer-events-none absolute inset-x-7 top-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-primary-light opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span
                  aria-hidden
                  className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                <div className="flex flex-1 items-center justify-center min-h-[160px] md:min-h-[180px]">
                  <img
                    src={b.logo}
                    alt={`Logo oficial ${b.name}`}
                    className={`max-w-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 ${b.logoClassName ?? "max-h-28 md:max-h-32"}`}
                    loading="lazy"
                  />
                </div>

                <div className="mt-5 border-t border-border pt-4 text-center">
                  <p className="font-display text-lg font-bold text-primary-dark">
                    {b.name}
                  </p>
                  {b.tagline && (
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                      {b.tagline}
                    </p>
                  )}
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 rounded-b-2xl bg-gradient-to-t from-primary via-primary/95 to-primary/0 px-4 pt-8 pb-4 text-sm font-semibold text-primary-foreground opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                  Visitar sitio oficial
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 text-center text-sm uppercase tracking-[0.25em] text-white/80"
        >
          Respaldo internacional · Calidad garantizada
        </motion.p>
      </div>
    </section>
  );
}
