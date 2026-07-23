const EASE = [0.22, 1, 0.36, 1] as const;
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { Leaf, Target, ShieldCheck, ArrowRight, Building2, Compass, Eye } from "lucide-react";
import coffee from "@/assets/about/coffee.jpg";
import h1 from "@/assets/hero/h1.jpg";
import h2 from "@/assets/hero/h2.jpg";
import h3 from "@/assets/hero/h3.jpg";
import h5 from "@/assets/hero/h5.jpg";
import videoNosotros from "@/assets/about/video-nosotros.mp4";

const gallery = [coffee, h1, h2, h3, h5, videoNosotros];

const values = [
  {
    icon: Leaf,
    title: "Sostenibilidad",
    desc: "Formulaciones eficientes que respetan el suelo y el ecosistema colombiano.",
  },
  {
    icon: Target,
    title: "Precisión técnica",
    desc: "Cada producto responde a necesidades reales de cultivo y región.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza",
    desc: "Registros ICA, control de calidad y respaldo agronómico continuo.",
  },
];

const corporateBlocks = [
  {
    icon: Building2,
    title: "¿Quiénes somos?",
    text: "Marca colombiana del Huila, de COOCENTRAL, especializada en fertilizantes de alta eficiencia para el campo colombiano.",
  },
  {
    icon: Compass,
    title: "Misión",
    text: "Ser el aliado estratégico de nuestros clientes con soluciones nutricionales que aumenten la productividad del campo.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Para 2025 ser una empresa reconocida nacionalmente con portafolio de marca propia en nuevos mercados agrícolas.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

export function About() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % gallery.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16"
    >
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoNosotros} type="video/mp4" />
      </video>

      {/* Capa oscura para mejorar la lectura */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 container-fc">
        {/* Header block */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Carrusel automático */}
          <motion.div
            ref={mediaRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative z-20"
          >
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-[var(--shadow-elevated)]">
              <AnimatePresence mode="sync">
                <motion.img
                  key={gallery[index]}
                  src={gallery[index]}
                  alt="Ferticolombia en el campo colombiano"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: EASE }}
                  style={{ y: yMain }}
                  className="absolute -inset-y-[8%] inset-x-0 h-[116%] w-full object-cover will-change-transform"
                  loading="lazy"
                />
              </AnimatePresence>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
              />

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {gallery.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-8 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Card flotante de experiencia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -top-6 -right-4 sm:-right-8 max-w-[220px] rounded-[20px] bg-card border border-border p-5 shadow-[var(--shadow-elevated)]"
            >
              <div className="text-4xl font-display font-extrabold text-primary leading-none">+20</div>
              <div className="mt-2 text-sm text-muted-foreground">años nutriendo el campo colombiano</div>
            </motion.div>
          </motion.div>

          {/* Contenido */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display font-extrabold tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] leading-[1.02]"
            >
              Aliados técnicos del productor colombiano
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-white/90">
              En Ferticolombia importamos y formulamos fertilizantes de alta eficiencia con foco en el rendimiento real
              de los cultivos. Más de dos décadas trabajando junto a agricultores, cooperativas y distribuidores en todo
              el territorio nacional.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="mt-4 text-lg text-white/90">
              Nuestra misión es entregar soluciones nutricionales precisas, sostenibles y respaldadas por acompañamiento
              agronómico permanente.
            </motion.p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  custom={4 + i}
                  className="rounded-[20px] border border-border bg-[var(--about-card-bg)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                    <v.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground font-sans">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} custom={7} className="mt-8">
              <a href="#contacto" className="btn-primary-fc">
                Conócenos más
                <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Corporate sub-section */}
        <div className="mt-12 md:mt-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 md:mb-10 block text-center text-sm md:text-base font-bold uppercase tracking-[0.25em] text-primary-light text-xl"
          >
            Quiénes somos
          </motion.span>
          
          <div className="grid gap-6 lg:gap-8 md:grid-cols-3">
            {corporateBlocks.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-border bg-card p-8 md:p-10 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                {/* Decorative accent line */}
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary to-primary-light/80 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <block.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-6 text-xl font-display font-bold text-foreground">
                    {block.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-foreground flex-grow">
                    {block.text}
                  </p>
                </div>

                {/* Subtle corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

