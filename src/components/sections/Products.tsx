const EASE = [0.22, 1, 0.36, 1] as const;
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, FileText, Check } from "lucide-react";
import { products, type IProduct } from "@/data/products";
import productsBg from "@/assets/backgrounds/products-bg-coffee.jpg";

function ProductCard({ product }: { product: IProduct }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white/85 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/95 hover:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.5)] hover:border-primary/40">
      <div className="relative aspect-[5/6] overflow-hidden bg-gradient-to-b from-white/60 to-white/30">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.52 0.14 145 / 0.18) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <img
          src={product.image}
          alt={`Empaque de ${product.name} ${product.formula}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-[var(--shadow-soft)]">
          {product.formula}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-foreground">
            {product.name}
          </h3>
          {product.icaRegistration && (
            <span className="shrink-0 mt-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {product.icaRegistration}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-primary">{product.tagline}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-subtle">
          {product.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-subtle">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <div className="pt-6 border-t border-border/70">
            <a
              href={product.datasheetUrl ?? "#contacto"}
              target={product.datasheetUrl ? "_blank" : undefined}
              rel={product.datasheetUrl ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:gap-3 hover:text-primary-dark"
            >
              <FileText className="h-4 w-4" strokeWidth={2.25} />
              Ver ficha técnica
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function useItemsPerView() {
  const [items, setItems] = useState(3);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 768) setItems(1);
      else if (w < 1024) setItems(2);
      else setItems(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return items;
}

export function Products() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const itemsPerView = useItemsPerView();
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, products.length - itemsPerView + 1);

  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [totalPages, page]);

  const prev = useCallback(
    () => setPage((p) => (p - 1 + totalPages) % totalPages),
    [totalPages],
  );
  const next = useCallback(
    () => setPage((p) => (p + 1) % totalPages),
    [totalPages],
  );

  const translatePct = useMemo(
    () => (page * 100) / itemsPerView,
    [page, itemsPerView],
  );

  return (
    <section id="productos" ref={ref} className="section-fc relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-[-24px] bg-cover bg-center blur-[1.5px]"
          style={{ backgroundImage: `url(${productsBg})`, y }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div className="container-fc relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.24em] text-[#A5D6A7]">
            Nuestros productos
          </span>
          <h2 className="mt-4 font-display text-white text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
            Nutrición formulada para cada cultivo
          </h2>
          <p className="mt-6 text-lg text-white/85">
            Portafolio técnico de fertilizantes y bioestimulantes de alta
            eficiencia, con registros ICA vigentes y respaldo agronómico.
          </p>
        </motion.div>

        <div className="relative">
          {/* Carrusel */}
          <div className="overflow-hidden px-1">
            <motion.div
              className="flex"
              animate={{ x: `-${translatePct}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {products.map((p) => (
                <div
                  key={p.slug}
                  className="shrink-0 px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="mx-auto h-full max-w-[414px]">
                    <ProductCard product={p} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Flechas */}
          {totalPages > 1 && (
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              <motion.button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.08 }}
                className="pointer-events-auto -ml-2 md:-ml-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur transition-colors hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2.25} />
              </motion.button>
              <motion.button
                type="button"
                onClick={next}
                aria-label="Siguiente"
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.08 }}
                className="pointer-events-auto -mr-2 md:-mr-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur transition-colors hover:bg-white"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2.25} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          <AnimatePresence initial={false}>
            {Array.from({ length: totalPages }).map((_, i) => {
              const active = i === page;
              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Ir a la página ${i + 1}`}
                  className="h-2.5 rounded-full transition-all"
                  animate={{
                    width: active ? 28 : 10,
                    backgroundColor: active
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.4)",
                  }}
                  whileHover={{ scale: 1.15 }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
