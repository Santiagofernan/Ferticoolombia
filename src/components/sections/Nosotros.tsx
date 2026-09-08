const EASE = [0.22, 1, 0.36, 1] as const;
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { Leaf, Target, ShieldCheck, ArrowRight, Building2, Compass, Eye } from "lucide-react";
// Public path base where optimized variants and poster can be placed (optional).
const PUBLIC_VIDEO_BASE = "/about/video-nosotros"; // place optimized files in public/about/
const PUBLIC_POSTER = "/about/video-nosotros-poster.avif";

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
    text: "Marca colombiana del Huila, propiedad de COOCENTRAL, con más de 10 años comercializando fertilizantes de calidad para el campo.",
  },
  {
    icon: Compass,
    title: "Misión",
    text: "Ser el aliado estratégico del agricultor con soluciones nutricionales que impulsen la productividad del campo colombiano.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Consolidarnos como una empresa reconocida a nivel nacional, con presencia en nuevos mercados agrícolas y un portafolio propio.",
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = () => {
      video.poster = PUBLIC_POSTER;
      const source = document.createElement('source');
      source.src = window.innerWidth <= 767
        ? `${PUBLIC_VIDEO_BASE}.mobile.webm`
        : `${PUBLIC_VIDEO_BASE}.720.webm`;
      source.type = 'video/webm';
      video.appendChild(source);
      video.load();

      const playPromise = video.play();
      playPromise?.catch(() => {
        // El navegador puede bloquear autoplay aunque el video esté muted.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadVideo();
        observer.disconnect();
      },
      { rootMargin: '300px 0px 300px 0px' },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative overflow-hidden pt-16 md:pt-20 pb-10 md:pb-12"
    >
      {/* Video de fondo optimizado para lazy loading. */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />


      {/* Capa oscura para mejorar la lectura */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 container-fc">
        {/* Header block */}
        <div className="flex flex-col items-center justify-center">
          {/* Card flotante de experiencia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8 w-fit rounded-[20px] bg-white/15 md:backdrop-blur-xl border border-white/20 px-5 py-3 shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
          >
            <div className="text-sm font-semibold text-white">+10 años nutriendo el campo colombiano</div>
          </motion.div>

          {/* Contenido */}
          <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display font-extrabold tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl leading-tight"
            >
              Aliados técnicos del productor colombiano
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg text-white">
              En Ferticoolombia importamos y comercializamos fertilizantes de alta eficiencia con foco en el rendimiento real
              de los cultivos. Más de 10 años trabajando junto a agricultores, cooperativas y distribuidores en gran parte
              del territorio nacional.
            </motion.p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  custom={4 + i}
                  className="rounded-[22px] border border-white/30 bg-gradient-to-br from-white/20 via-white/12 to-white/8 md:backdrop-blur-2xl p-5 transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_12px_40px_rgba(255,255,255,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:border-white/70 hover:from-white/30 hover:via-white/20 hover:to-white/15 group"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
                    <v.icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white font-sans">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/90">{v.desc}</p>
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
        <div className="mt-12 md:mt-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 block text-center text-sm md:text-base font-bold uppercase tracking-[0.3em] text-white"
          >
            Quiénes somos
          </motion.span>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {corporateBlocks.map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-[22px] border border-white/30 bg-gradient-to-br from-white/20 via-white/12 to-white/8 backdrop-blur-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_12px_40px_rgba(255,255,255,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:border-white/70 hover:from-white/30 hover:via-white/20 hover:to-white/15"
              >
                {/* Decorative accent line */}
                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary to-primary-light/80 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
                    <block.icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-4 text-lg font-display font-bold text-white">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/95 flex-grow">
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
