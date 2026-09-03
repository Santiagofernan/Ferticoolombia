import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowLeft, X, MapPin, MoveHorizontal } from "lucide-react";
import { useRef, useState, type TouchEvent } from "react";
import { Link } from "@tanstack/react-router";

import AgriculturalBackground from "@/components/backgrounds/AgriculturalBackground";
import heroImg from "@/assets/backgrounds/products-bg-coffee.avif";
import cafeImg from "@/assets/crops/cafe.avif";
import platanoImg from "@/assets/crops/platano.avif";
import maracuyaImg from "@/assets/crops/maracuya.avif";
import tomateImg from "@/assets/crops/tomate.avif";
import papaImg from "@/assets/crops/papa.webp";
import cañaImg from "@/assets/crops/caña.avif";
import limoImg from "@/assets/crops/limon.avif";
import aguacateImg from "@/assets/crops/aguacate.avif";
import beforeImg from "@/assets/parallax/cafe.avif";
import afterImg from "@/assets/hero/h5.avif";
import ctaBg from "@/assets/hero/h7.avif";

import { absoluteSiteUrl, SITE_URL } from "@/lib/seo";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Cultivo {
  nombre: string;
  imagen: string;
  resultado: string;
  region: string;
}

const cultivos: Cultivo[] = [
  {
    nombre: "Café",
    imagen: cafeImg,
    resultado: "+18% en rendimiento por hectárea",
    region: "Eje Cafetero",
  },
  {
    nombre: "Plátano",
    imagen: platanoImg,
    resultado: "Racimos con mayor peso y llenado",
    region: "Valle del Cauca",
  },
  {
    nombre: "Maracuyá",
    imagen: maracuyaImg,
    resultado: "Floración sostenida y mejor cuaje",
    region: "Huila",
  },
  {
    nombre: "Tomate",
    imagen: tomateImg,
    resultado: "Mayor firmeza y vida en anaquel",
    region: "Cundinamarca",
  },
  {
    nombre: "Papa",
    imagen: papaImg,
    resultado: "Incremento en el tamaño y calidad del tubérculo",
    region: "Nariño",
  },
  {
    nombre: "Caña de azúcar",
    imagen: cañaImg,
    resultado: "Mejor desarrollo y rendimiento del cultivo",
    region: "Cauca",
  },
  {
    nombre: "Limón",
    imagen: limoImg,
    resultado: "Frutos más grandes y jugosos",
    region: "Magdalena",
  },
  {
    nombre: "Aguacate",
    imagen: aguacateImg,
    resultado: "Mayor producción y calidad de frutos",
    region: "Antioquia",
  },
];

export const Route = createFileRoute("/impacto-agronomico")({
  head: () => ({
    meta: [
      { title: "Impacto Agronómico | Ferticolombia" },
      {
        name: "description",
        content:
          "Resultados reales de productores colombianos que usan fertilizantes Ferticolombia en café, plátano, maracuyá y tomate.",
      },
      { property: "og:title", content: "Impacto Agronómico | Ferticolombia" },
      {
        property: "og:description",
        content: "Rendimiento, calidad y productividad comprobados en cultivos de Colombia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ferticolombia" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Impacto Agronómico | Ferticolombia" },
      {
        name: "twitter:description",
        content: "Rendimiento, calidad y productividad comprobados en cultivos de Colombia.",
      },
      ...(SITE_URL
        ? [
            { property: "og:url", content: `${SITE_URL}/impacto-agronomico` },
            { property: "og:image", content: absoluteSiteUrl(heroImg) ?? "" },
            { name: "twitter:image", content: absoluteSiteUrl(heroImg) ?? "" },
          ]
        : []),
    ],
    links: [...(SITE_URL ? [{ rel: "canonical", href: `${SITE_URL}/impacto-agronomico` }] : [])],
  }),
  component: ImpactoAgronomico,
});

function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-primary/15 shadow-[var(--shadow-card)]">
      <div className="relative aspect-[16/9] select-none">
        <img
          src={afterImg}
          alt="Cultivo después del tratamiento nutricional"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={beforeImg}
            alt="Cultivo antes del tratamiento nutricional"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: `${(100 / Math.max(pos, 1)) * 100}%`, maxWidth: "none" }}
          />
          <span className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            Antes
          </span>
        </div>
        <span className="absolute right-5 top-5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
          Después
        </span>

        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
          <div className="h-full w-[3px] -translate-x-1/2 bg-white/90" />
          <div className="absolute top-1/2 left-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparar antes y después"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
function ImpactoAgronomico() {
  const [selected, setSelected] = useState<Cultivo | null>(null);
  const selectedIndex = selected ? cultivos.findIndex((c) => c.nombre === selected.nombre) : -1;
  const touchStartXRef = useRef<number | null>(null);

  const move = (dir: number) => {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + dir + cultivos.length) % cultivos.length;
    setSelected(cultivos[next]);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const delta = touchEndX - touchStartXRef.current;
    if (delta > 40) move(-1);
    if (delta < -40) move(1);
    touchStartXRef.current = null;
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Cultivo de café en Colombia"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

        <div className="container-fc relative z-10 py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-[720px] text-white"
          >
            <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em]">
              Resultados reales
            </span>
            <h1 className="mt-6 font-display font-extrabold leading-[1.05] text-white">
              Impacto
              <br />
              Agronómico
            </h1>
            <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-white/90">
              Descubre cómo nuestros fertilizantes han mejorado la productividad, calidad y
              rendimiento de cientos de cultivos en Colombia.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#resultados"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-30px_rgba(34,197,94,0.8)] transition hover:bg-emerald-500"
              >
                Ver resultados
                <ArrowDown className="h-5 w-5" strokeWidth={2.25} />
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-white/20"
              >
                Volver
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section
        id="resultados"
        className="relative isolate overflow-hidden bg-background py-20 transition-colors duration-400 lg:py-28"
      >
        <AgriculturalBackground
          particleCount={22}
          particleSpeed={0.65}
          intensity={0.7}
          opacity={1}
          parallaxSpeed={0.5}
          leaves={true}
          clouds={true}
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/55 dark:bg-black/65" />
        <div className="relative z-10">
          <div className="container-fc">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mx-auto max-w-2xl text-center text-white"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                Resultados reales
              </span>
              <h2 className="mt-4 font-display text-white">Impacto en diferentes cultivos</h2>
              <p className="mt-5 text-lg text-white/90">
                Conoce algunos de los resultados obtenidos por productores que utilizan
                fertilizantes Ferticolombia en distintas regiones del país.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {cultivos.map((cultivo, i) => (
                <motion.button
                  key={cultivo.nombre}
                  type="button"
                  onClick={() => setSelected(cultivo)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="group flex flex-col overflow-hidden rounded-[24px] border border-white/10 dark:border-border/50 bg-white/90 dark:bg-card text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] dark:shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:border-primary dark:hover:border-primary/50 hover:shadow-[0_25px_70px_-34px_rgba(34,197,94,0.4)] dark:hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cultivo.imagen}
                      alt={`Cultivo de ${cultivo.nombre}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute bottom-4 left-5 font-display text-2xl font-bold text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
                      {cultivo.nombre}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-[15px] font-semibold text-foreground dark:text-card-foreground">
                      {cultivo.resultado}
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-subtle dark:text-card-foreground/85">
                      <MapPin className="h-4 w-4 text-primary dark:text-primary-light" />
                      {cultivo.region}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-light">
                      Ver caso
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ANTES Y DESPUÉS */}
      <section className="section-fc bg-surface transition-colors duration-400 dark:bg-muted">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
              Comparativa
            </span>
            <h2 className="mt-4 font-display">Antes y después</h2>
            <p className="mt-5 text-lg dark:text-foreground/90">
              Desliza la barra para comparar el estado del cultivo antes y después de aplicar el
              programa nutricional de Ferticolombia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-14"
          >
            <BeforeAfter />
          </motion.div>
        </div>
      </section>
      {/* CTA FINAL */}
      <section className="relative isolate overflow-hidden py-24 lg:py-32">
        <img
          src={ctaBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[center_44%] sm:object-[center_42%] lg:object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-black/70 to-black/60" />
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 230"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 w-full fill-surface sm:h-28 lg:h-36 dark:fill-muted"
        >
          <path d="M0 0H1440V108C1266 160 1112 196 922 164C714 128 612 202 402 180C218 160 88 112 0 138Z" />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="container-fc relative z-10 text-center"
        >
          <h2 className="mx-auto max-w-3xl font-display text-white">
            ¿Quieres obtener estos resultados en tu cultivo?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
            Nuestro equipo técnico diseña un programa nutricional a la medida de tu finca y tu
            cultivo.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/#contacto"
              className="btn-primary-fc bg-white text-primary hover:bg-white hover:text-primary-dark"
            >
              Solicitar asesoría
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
            </a>
            <a
              href="/#productos"
              className="btn-secondary-fc border-white text-white hover:bg-white hover:text-primary-dark"
            >
              Ver productos
            </a>
          </div>
        </motion.div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl overflow-y-auto overflow-x-hidden rounded-[28px] bg-card shadow-[var(--shadow-elevated)] sm:max-h-[calc(100dvh-3rem)]"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-card text-foreground dark:text-card-foreground shadow-md transition-all duration-300 hover:rotate-90 hover:bg-white dark:hover:bg-surface"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selected.nombre}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={selected.imagen}
                      alt={`Cultivo de ${selected.nombre}`}
                      className="block max-h-[42dvh] min-h-52 w-full object-cover sm:max-h-[50dvh] md:max-h-[56dvh]"
                    />
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    aria-label="Cultivo anterior"
                    className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 dark:border-white/20 bg-black/35 dark:bg-black/50 text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-primary dark:hover:bg-surface dark:hover:text-primary-light sm:left-4 sm:h-11 sm:w-11"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    aria-label="Cultivo siguiente"
                    className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 dark:border-white/20 bg-black/35 dark:bg-black/50 text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-primary dark:hover:bg-surface dark:hover:text-primary-light sm:right-4 sm:h-11 sm:w-11"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-dark dark:text-primary">
                    Caso de éxito
                  </span>
                  <h3 className="mt-3 font-display text-foreground dark:text-card-foreground">
                    {selected.nombre}
                  </h3>
                  <p className="mt-4 text-[17px] font-semibold text-foreground dark:text-card-foreground">
                    {selected.resultado}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground/80 dark:text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary dark:text-primary-light" />
                    {selected.region}
                  </p>
                  <div className="mt-6 h-px bg-border dark:bg-border/50" />
                  <p className="mt-6 text-[15px] font-medium leading-relaxed text-foreground/90 dark:text-muted-foreground">
                    Programa nutricional Ferticolombia con acompañamiento técnico en campo, análisis
                    de suelo y dosificación por etapa fenológica.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
