import { useEffect, useLayoutEffect, useState } from "react";
import { ChevronDown, Sprout, ArrowRight } from "lucide-react";

import h1 from "@/assets/hero/h1.avif";
import h2 from "@/assets/hero/h2.avif";
import h3 from "@/assets/hero/h3.avif";
import h4 from "@/assets/hero/h4.avif";
import h5 from "@/assets/hero/h5.avif";
import h6 from "@/assets/hero/h6.avif";
import h7 from "@/assets/hero/h7.avif";
import h1Mobile from "@/assets/hero/h1-mobile.avif";
import h2Mobile from "@/assets/hero/h2-mobile.avif";
import h3Mobile from "@/assets/hero/h3-mobile.avif";
import h4Mobile from "@/assets/hero/h4-mobile.avif";
import h5Mobile from "@/assets/hero/h5-mobile.avif";
import h6Mobile from "@/assets/hero/h6-mobile.avif";
import h7Mobile from "@/assets/hero/h7-mobile.avif";

const slides = [
  { url: h5, mobileUrl: h5Mobile, desktopWidth: 1672, alt: "cosecha de café" },
  { url: h7, mobileUrl: h7Mobile, desktopWidth: 1920, alt: "Cultivo de café en Sevilla" },
  { url: h1, mobileUrl: h1Mobile, desktopWidth: 1672, alt: "Flor de café en plena floración" },
  { url: h3, mobileUrl: h3Mobile, desktopWidth: 1672, alt: "Finca de café y plátano" },
  { url: h4, mobileUrl: h4Mobile, desktopWidth: 1672, alt: "Campo cultivado" },
  { url: h6, mobileUrl: h6Mobile, desktopWidth: 1672, alt: "Cerezas de café maduras" },
  { url: h2, mobileUrl: h2Mobile, desktopWidth: 1672, alt: "Palo de café" },
];

const INTERVAL = 2500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [prioritizeHero, setPrioritizeHero] = useState(false);

  // Keep the popup preload ahead of the first Hero image on the initial document.
  useLayoutEffect(() => {
    setPrioritizeHero(true);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Carousel layer */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <img
            key={s.url}
            src={s.url}
            srcSet={`${s.mobileUrl} 768w, ${s.url} ${s.desktopWidth}w`}
            sizes="100vw"
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 && prioritizeHero ? "high" : "auto"}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "scale(1.04)" }}
          />
        ))}

        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        {/* Brand tint */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-40"
          style={{
            background: "linear-gradient(135deg, oklch(0.35 0.10 145) 0%, transparent 55%)",
          }}
        />
        {/* Dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-fc w-full pt-32 pb-24 relative z-10">
        <div className="max-w-[720px] text-white animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Sprout className="h-4 w-4" strokeWidth={2.25} />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em]">Líderes en nutrición vegetal</span>
          </div>

          <h1 className="mt-6 text-white font-display font-extrabold tracking-tight leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
            Nutriendo el crecimiento del{" "}
            <span className="relative inline-block">
              <span className="relative z-10">campo colombiano</span>
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-[600px] leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]">
            Más de 10 años importando y comercializando fertilizantes de alta eficiencia. Soluciones técnicas, sostenibles y
            confiables para el productor colombiano.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#productos"
              className="btn-primary-fc bg-white text-primary hover:bg-white hover:text-primary-dark"
              style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.45)" }}
            >
              Ver productos
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} />
            </a>
            <a href="#contacto" aria-label="Solicitar asesoría en la sección de contacto" className="btn-secondary-fc border-white text-white hover:bg-white hover:text-primary">
              Solicitar asesoría
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-14 grid w-full max-w-[520px] grid-cols-[minmax(0,1fr)_minmax(112px,1.25fr)_minmax(0,1fr)] gap-x-[clamp(12px,4vw,28px)] border-t border-white/20 px-[clamp(16px,5vw,32px)] pt-8">
            {[
              { k: "+10", v: "años" },
              { k: "50.000+", v: "toneladas distribuidas" },
              { k: "8", v: "departamentos" },
            ].map((s, i) => (
              <div
                key={s.v}
                className={`relative flex w-full min-w-0 flex-col items-center text-center ${
                  i > 0 ? "border-l border-white/25" : ""
                }`}
              >
                <div className="whitespace-nowrap font-display text-2xl md:text-3xl font-extrabold text-white">{s.k}</div>
                <div className="mt-1 w-full min-w-0 break-words [overflow-wrap:break-word] text-xs uppercase tracking-wider text-white/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#nosotros"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors z-10"
        aria-label="Desplazar"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Descubrir</span>
        <ChevronDown className="h-5 w-5 animate-bounce" strokeWidth={2.25} />
      </a>
    </section>
  );
}
