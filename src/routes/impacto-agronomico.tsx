import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  X,
  Sprout,
  Users,
  MapPin,
  Package,
  MoveHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/backgrounds/products-bg-coffee.png";
import cafeImg from "@/assets/crops/cafe.png";
import platanoImg from "@/assets/crops/platano.png";
import maracuyaImg from "@/assets/crops/maracuya.png";
import tomateImg from "@/assets/crops/tomate.png";
import papaImg from "@/assets/crops/papa.png";
import cañaImg from "@/assets/crops/caña.png";
import limoImg from "@/assets/crops/limon.png";
import aguacateImg from "@/assets/crops/aguacate.png";
import beforeImg from "@/assets/hero/h5.png";
import afterImg from "@/assets/parallax/cafe.jpg";
import ctaBg from "@/assets/stats/coffee-field.jpg";

import { Link } from "@tanstack/react-router";


const EASE = [0.22, 1, 0.36, 1] as const;

interface Cultivo {
  nombre: string;
  imagen: string;
  resultado: string;
  region: string;
}

const cultivos: Cultivo[] = [
  { nombre: "Café", imagen: cafeImg, resultado: "+18% en rendimiento por hectárea", region: "Eje Cafetero" },
  { nombre: "Plátano", imagen: platanoImg, resultado: "Racimos con mayor peso y llenado", region: "Valle del Cauca" },
  { nombre: "Maracuyá", imagen: maracuyaImg, resultado: "Floración sostenida y mejor cuaje", region: "Huila" },
  { nombre: "Tomate", imagen: tomateImg, resultado: "Mayor firmeza y vida en anaquel", region: "Cundinamarca" },
  { nombre: "Papa", imagen: papaImg, resultado: "Incremento en el tamaño y calidad del tubérculo", region: "Nariño" },
  { nombre: "Caña de azúcar", imagen: cañaImg, resultado: "Mejor desarrollo y rendimiento del cultivo", region: "Cauca" },
  { nombre: "Limón", imagen: limoImg, resultado: "Frutos más grandes y jugosos", region: "Magdalena" },
  { nombre: "Aguacate", imagen: aguacateImg, resultado: "Mayor producción y calidad de frutos", region: "Antioquia" },
];

const estadisticas = [
  { icon: Sprout, value: 20, prefix: "+", label: "Años de experiencia" },
  { icon: Users, value: 1000, prefix: "+", label: "Productores atendidos" },
  { icon: MapPin, value: 15, prefix: "+", label: "Departamentos con presencia" },
  { icon: Package, value: 50, prefix: "+", label: "Referencias de fertilizantes" },
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactoAgronomico,
});

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("es-CO"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 1.8, ease: EASE });
    return controls.stop;
  }, [inView, to, count]);

  useEffect(() => rounded.on("change", (v) => {
    if (ref.current) ref.current.textContent = v;
  }), [rounded]);

  return <span ref={ref}>0</span>;
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-primary/15 shadow-[var(--shadow-card)]">
      <div className="relative aspect-[16/9] select-none">
        <img src={afterImg} alt="Cultivo después del tratamiento nutricional" className="absolute inset-0 h-full w-full object-cover" />
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

  const move = (dir: number) => {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + dir + cultivos.length) % cultivos.length;
    setSelected(cultivos[next]);
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Cultivo de café en Colombia" className=" absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

        <div className="container-fc relative z-10 py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className=" max-w-[720px] text-white"
            >
            <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              Resultados reales
            </span>

            <h1 className="mt-6 font-display font-extrabold text-white leading-[1.05]">
              Impacto
              <br />
              Agronómico
            </h1>
            <p className="mt-6 max-w-[600px] text-lg text-white/90 leading-relaxed">
              Descubre cómo nuestros fertilizantes han mejorado la productividad, calidad y rendimiento de cientos de
              cultivos en Colombia.
            </p>
          <div className="mt-10 flex items-center gap-5">    
            <a href="#resultados" className="btn-primary-fc  bg-white text-primary hover:bg-white hover:text-primary-dark">
              Ver los resultados
              <ArrowDown className="h-5 w-5" strokeWidth={2.25} />
            </a>
            <Link
              to="/"
              className="btn-secondary-fc  bg-white/10 text-white hover:bg-white/20"
            >
            Volver a Ferticoolomabia
            </Link> 
          </div>         
          </motion.div>
        </div>
      </section>
      {/* ESTADÍSTICAS */}
      <section aria-label="Cifras de impacto" className="bg-surface py-16 lg:py-20">
        <div className="container-fc">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {estadisticas.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex items-center gap-5 rounded-[22px] border border-primary/15 bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)] lg:p-7"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] bg-primary/10 text-primary">
                  <s.icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold leading-none text-foreground lg:text-4xl">
                    {s.prefix}
                    <Counter to={s.value} />
                  </div>
                  <p className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className="section-fc bg-background">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Resultados reales</span>
            <h2 className="mt-4 font-display">Impacto en diferentes cultivos</h2>
            <p className="mt-5 text-lg">
              Conoce algunos de los resultados obtenidos por productores que utilizan fertilizantes Ferticolombia en
              distintas regiones del país.
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
                className="group flex flex-col overflow-hidden rounded-[24px] border border-border bg-card text-left shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-[var(--shadow-card)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cultivo.imagen}
                    alt={`Cultivo de ${cultivo.nombre}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-display text-2xl font-bold text-white">
                    {cultivo.nombre}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[15px] font-semibold text-foreground">{cultivo.resultado}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {cultivo.region}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Ver caso
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ANTES Y DESPUÉS */}
      <section className="section-fc bg-surface">
        <div className="container-fc">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Comparativa</span>
            <h2 className="mt-4 font-display">Antes y después</h2>
            <p className="mt-5 text-lg">
              Desliza la barra para comparar el estado del cultivo antes y después de aplicar el programa nutricional
              de Ferticolombia.
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
      <img src={ctaBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-black/70 to-black/60" />

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
            Nuestro equipo técnico diseña un programa nutricional a la medida de tu finca y tu cultivo.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/#contacto" className="btn-primary-fc bg-white text-primary hover:bg-white hover:text-primary-dark">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-card shadow-[var(--shadow-elevated)]"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-all duration-300 hover:rotate-90 hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Cultivo anterior"
                className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-colors hover:bg-white hover:text-primary"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Cultivo siguiente"
                className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-colors hover:bg-white hover:text-primary"
              >
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected.nombre}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={selected.imagen}
                    alt={`Cultivo de ${selected.nombre}`}
                    className="h-64 w-full object-cover md:h-full"
                  />
                </AnimatePresence>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Caso de éxito</span>
                  <h3 className="mt-3 font-display">{selected.nombre}</h3>
                  <p className="mt-4 text-[17px] font-semibold text-foreground">{selected.resultado}</p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {selected.region}
                  </p>
                  <div className="mt-6 h-px bg-border" />
                  <p className="mt-6 text-[15px] leading-relaxed">
                    Programa nutricional Ferticolombia con acompañamiento técnico en campo, análisis de suelo y
                    dosificación por etapa fenológica.
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