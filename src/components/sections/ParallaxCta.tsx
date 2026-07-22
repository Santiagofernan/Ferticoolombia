import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import cafe from "@/assets/parallax/cafe.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ParallaxCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-label="Nutrimos el crecimiento del agro colombiano"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(480px, 65vh, 680px)" }}
    >
      {/* Parallax image — protagonista */}
      <motion.div
        style={{ y }}
        className="absolute -inset-y-[10%] inset-x-0 will-change-transform"
      >
        <img
          src={cafe}
          alt="Cultivo de café colombiano en plena cosecha"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlay mínimo solo para legibilidad del texto (no oculta la foto) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/35"
      />

      {/* Contenido */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container-fc text-center">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-white max-w-4xl mx-auto"
            style={{ textShadow: "0 2px 20px oklch(0 0 0 / 0.5)" }}
          >
            Nutrimos el crecimiento del agro colombiano
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: "0 1px 12px oklch(0 0 0 / 0.5)" }}
          >
            Más de 20 años acompañando a productores colombianos con soluciones
            de nutrición vegetal de alta calidad.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-10"
          >
            <a href="#productos" className="btn-primary-fc">
              Conocer nuestros productos
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
