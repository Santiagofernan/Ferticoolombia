import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Replace only this value when the final YouTube video is available.
const YOUTUBE_VIDEO_ID = "AQUI_VA_EL_ID";

const YOUTUBE_THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const YOUTUBE_THUMBNAIL_FALLBACK = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;

export function YouTubeVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(YOUTUBE_THUMBNAIL);

  const hasVideoId = YOUTUBE_VIDEO_ID !== "AQUI_VA_EL_ID";

  return (
    <section className="bg-background py-20 lg:py-28" aria-labelledby="youtube-video-title">
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
          <h2 id="youtube-video-title" className="mt-4 font-display">
            Tecnología y nutrición para transformar el campo
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            Conoce más sobre nuestra propuesta, nuestros productos y el acompañamiento que brindamos al agricultor colombiano.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[24px] border border-border/70 bg-card shadow-[0_24px_70px_-30px_rgba(0,0,0,0.35)]"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-primary-dark">
            {isPlaying && hasVideoId ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={YOUTUBE_EMBED_URL}
                title="Video de Ferticoolombia"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                {hasVideoId && (
                  <img
                    src={thumbnail}
                    alt="Vista previa del video de Ferticoolombia"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                    onError={() => setThumbnail(YOUTUBE_THUMBNAIL_FALLBACK)}
                  />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <button
                  type="button"
                  onClick={() => hasVideoId && setIsPlaying(true)}
                  disabled={!hasVideoId}
                  aria-label={hasVideoId ? "Reproducir video de Ferticoolombia" : "Configura el ID del video de YouTube"}
                  className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_35px_-12px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-80 sm:h-20 sm:w-20"
                >
                  <Play className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9" />
                </button>
                {!hasVideoId && (
                  <p className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 text-center text-xs font-medium text-white/90">
                    Agrega el ID del video de YouTube en YouTubeVideoSection.tsx
                  </p>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
