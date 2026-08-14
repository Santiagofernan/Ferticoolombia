const EASE = [0.22, 1, 0.36, 1] as const;
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { products, type IProduct } from "@/data/products";
import productsBg from "@/assets/backgrounds/products-bg-coffee.avif";

function ProductCard({
  product,
  onOpenFicha,
}: {
  product: IProduct;
  onOpenFicha: (product: IProduct) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

return (
    <article className="group flex min-h-[500px] sm:min-h-[620px] lg:min-h-[700px] flex-col overflow-hidden rounded-[20px] sm:rounded-[28px] ring-2 ring-[#4CAF50]/40 bg-gradient-to-br from-[oklch(0.98_0.02_145)] via-white/95 to-[oklch(0.94_0.05_145)] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:ring-[#2E7D32] hover:shadow-[0_25px_70px_-15px_rgba(76,175,80,0.45)]">   
      <div onClick={() => onOpenFicha(product)}
        className="cursor-pointer"
        >   
          <div className="relative h-[240px] sm:h-[280px] overflow-hidden rounded-t-[28px] border-b border-[#4CAF50]/40">
            <img
              src={product.image}
              alt={`Empaque de ${product.name} ${product.formula}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain p-5 sm:p-3 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:gap-4 p-3.5 sm:p-6">
        <header className="space-y-0">
          <h3 className="font-display text-base sm:text-[1.45rem] leading-tight font-bold text-foreground">
            {product.name}
          </h3>
          <p className="text-xs font-semibold text-primary">{product.tagline}</p>
        </header>
        {/* Composición química e ICA */}
        <div className="flex items-center gap-2 flex-wrap">
          {product.formula && (
            <div className="rounded-full backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-black shadow-[var(--shadow-soft)]" style={{ backgroundColor: '#86e48b' }}>
              {product.formula}
            </div>
          )}
          {product.icaRegistration && (
            <div className="rounded-full border backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-black shadow-[var(--shadow-soft)]" style={{ backgroundColor: '#A8DCAB', borderColor: '#86e48b' }}>
              {product.icaRegistration}
            </div>
          )}
        </div>

        <p className="text-xs sm:text-[14px] leading-snug sm:leading-relaxed text-subtle line-clamp-3 sm:line-clamp-none">
          {product.description}
        </p>
        {product.benefits.length > 0 && (
          <>
              <ul className="space-y-1 sm:space-y-2 rounded-lg sm:rounded-xl bg-[oklch(0.97_0.03_145)]/70 border border-primary/10 p-2 sm:p-3">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm">
                    <span className="mt-0.5 inline-flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />
                    </span>
                    <span className="text-subtle leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
          </>
        )}
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
      const [selectedFicha, setSelectedFicha] = useState<IProduct | null>(null);
      
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

      // Mobile/trackpad interaction: swipe on touch devices and horizontal trackpad
      // wheel gestures when cursor is over the carousel. Only active when
      // `itemsPerView === 1` (mobile view).
      const carouselRef = useRef<HTMLDivElement | null>(null);
      const touchStartXRef = useRef<number | null>(null);
      const pointerOverRef = useRef(false);
      const lastWheelTimeRef = useRef(0);

      useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
          if (itemsPerView !== 1) return;
          if (!pointerOverRef.current) return;
          const now = Date.now();
          if (now - lastWheelTimeRef.current < 350) return; // throttle
          const dx = e.deltaX || 0;
          if (Math.abs(dx) > 20) {
            if (dx > 0) next();
            else prev();
            lastWheelTimeRef.current = now;
          }
        };

        const onPointerEnter = () => (pointerOverRef.current = true);
        const onPointerLeave = () => (pointerOverRef.current = false);

        el.addEventListener("wheel", onWheel, { passive: true });
        el.addEventListener("pointerenter", onPointerEnter);
        el.addEventListener("pointerleave", onPointerLeave);

        return () => {
          el.removeEventListener("wheel", onWheel);
          el.removeEventListener("pointerenter", onPointerEnter);
          el.removeEventListener("pointerleave", onPointerLeave);
        };
      }, [itemsPerView, next, prev]);

      // Touch swipe handling for mobile
      useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const onTouchStart = (ev: TouchEvent) => {
          touchStartXRef.current = ev.touches[0]?.clientX ?? null;
        };
        const onTouchEnd = (ev: TouchEvent) => {
          if (touchStartXRef.current === null) return;
          const touchEndX = ev.changedTouches[0]?.clientX ?? 0;
          const delta = touchEndX - (touchStartXRef.current ?? 0);
          if (delta > 40) prev();
          if (delta < -40) next();
          touchStartXRef.current = null;
        };

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
          el.removeEventListener("touchstart", onTouchStart);
          el.removeEventListener("touchend", onTouchEnd);
        };
      }, [itemsPerView, next, prev]);

      // show a small touch hint briefly on mobile
      useEffect(() => {
        // no-op: touch hint removed per user request
      }, [itemsPerView]);

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
          <div className="container-fc w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="max-w-3xl mx-auto text-center mb-8 sm:mb-16"
            >
              <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#A5D6A7]">
                Nuestros productos
              </span>
              <h2 className="mt-3 sm:mt-4 font-display text-white text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                Nutrición formulada para cada cultivo
              </h2>
            </motion.div>
            <div className="relative">
              {/* Carrusel */}
              <div className="overflow-hidden px-1" ref={carouselRef}>
                <motion.div
                  className="flex"
                  animate={{ x: `-${translatePct}%` }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {products.map((p) => (
                    <div
                      key={p.slug}
                      className="shrink-0 px-3 sm:px-6 lg:px-8"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="mx-auto w-[92%] sm:w-full max-w-[380px]">
                        <ProductCard
                        product={p}
                        onOpenFicha={setSelectedFicha}
                      />
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
            {/* Dots productos */}
            <div className="mt-6 sm:mt-10 flex items-center justify-center gap-2.5">
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
            {/* Banner promocional */}
          </div>
          <AnimatePresence>
      {selectedFicha && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedFicha(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFicha(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
            >
              ✕
            </button>

            <img
              src={selectedFicha.ficha}
              alt={`Ficha técnica ${selectedFicha.name}`}
              className="max-h-[90vh] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </section>
  );
}