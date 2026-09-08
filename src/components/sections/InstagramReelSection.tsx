import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const INSTAGRAM_EMBED_URL = "https://www.instagram.com/reel/Dc4pURdBkx9/embed/";

export function InstagramReelSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-background py-20 lg:py-28" aria-labelledby="instagram-reel-title">
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
          <h2 id="instagram-reel-title" className="mt-4 font-display">
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
          <div className="relative aspect-video w-full overflow-hidden bg-primary-dark">
            {isPlaying ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={INSTAGRAM_EMBED_URL}
                title="Reel de Ferticoolombia en Instagram"
                loading="lazy"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 bg-primary-dark"
                  role="img"
                  aria-label="Vista previa del Reel de Ferticoolombia en Instagram"
                />
                <div className="absolute inset-0 bg-black/40" />
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Reproducir Reel de Ferticoolombia en Instagram"
                  className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white dark:bg-card text-primary dark:text-card-foreground shadow-[0_10px_35px_-12px_rgba(0,0,0,0.55)] dark:shadow-none transition-all duration-300 hover:scale-105 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 dark:focus-visible:ring-primary/50 sm:h-20 sm:w-20"
                >
                  <Play className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
