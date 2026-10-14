import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const VIDEOS = [
  {
    id: "CisJGj7JQzQ",
    title: "¡Fertiliza con Ferticoolombia y derrota al fenómeno del Niño!",
    thumbnail: "maxresdefault.jpg",
  },
  {
    id: "CbkHfdHollA",
    title: "¡Katiuska transforma el café! Testimonio real de Timaná, Huila",
    thumbnail: "maxresdefault.jpg",
  },
  {
    id: "tXjdSsoMiDo",
    title: "¡Más carga y mejor calidad! Testimonio de Hosneider Garrido en Pitalito, Huila",
    thumbnail: "maxresdefault.jpg",
  },
];

export function YouTubeVideosSection() {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const video = VIDEOS[selectedVideo];

  const changeVideo = (direction: -1 | 1) => {
    setSelectedVideo((current) => (current + direction + VIDEOS.length) % VIDEOS.length);
    setIsPlaying(false);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button")) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    touchStartY.current = event.changedTouches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    const touch = event.changedTouches[0];
    if (startX === null || startY === null || !touch) return;

    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    changeVideo(deltaX < 0 ? 1 : -1);
  };

  return (
    <section className="bg-background py-20 lg:py-28" aria-labelledby="youtube-videos-title">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Conoce Ferticoolombia
          </span>
          <h2 id="youtube-videos-title" className="mt-4 font-display">
            Tecnología y nutrición para transformar el campo
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Conoce más sobre nuestra propuesta, nuestros productos y el acompañamiento que brindamos
            al agricultor colombiano.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[24px] border border-border/70 bg-card shadow-[0_24px_70px_-30px_rgba(0,0,0,0.35)]"
        >
          <div
            className="relative aspect-video w-full overflow-hidden bg-primary-dark"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              touchStartX.current = null;
              touchStartY.current = null;
            }}
          >
            {isPlaying ? (
              <iframe
                key={video.id}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  key={video.id}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={`https://i.ytimg.com/vi/${video.id}/${video.thumbnail}`}
                  alt=""
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/35" />
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label={`Reproducir: ${video.title}`}
                  className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card text-primary shadow-[0_10px_35px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 dark:border-border dark:text-primary-light dark:shadow-none dark:hover:bg-primary-dark dark:hover:text-primary-foreground sm:h-20 sm:w-20"
                >
                  <Play className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9" aria-hidden="true" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => changeVideo(-1)}
              aria-label="Ver video anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card/95 text-primary shadow-lg transition hover:scale-105 hover:bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 dark:border-border dark:bg-card dark:text-primary-light dark:shadow-none dark:hover:bg-surface sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changeVideo(1)}
              aria-label="Ver siguiente video"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-card/95 text-primary shadow-lg transition hover:scale-105 hover:bg-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 dark:border-border dark:bg-card dark:text-primary-light dark:shadow-none dark:hover:bg-surface sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex min-h-32 items-center gap-5 px-5 py-6 sm:gap-8 sm:px-9 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedVideo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex w-full items-center gap-5 sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-display text-5xl font-extrabold leading-none tracking-tight text-primary/20 dark:text-primary-light/25 sm:text-7xl"
                >
                  {String(selectedVideo + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 border-l-2 border-primary/25 pl-5 dark:border-primary-light/30 sm:pl-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary dark:text-primary-light">
                    Video {selectedVideo + 1} de {VIDEOS.length} · Historias que inspiran
                  </p>
                  <h3 className="mt-2 max-w-3xl font-display text-left text-lg font-bold leading-snug text-foreground sm:text-2xl">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
