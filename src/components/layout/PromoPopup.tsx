import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import banner1 from "@/assets/banners/banner1.png";
import banner2 from "@/assets/banners/banner2.png";

const banners = [
  banner1,
  banner2,
];

export default function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  // Mostrar una sola vez al día
  useEffect(() => {
  const popupShown = localStorage.getItem("ferticolombia-popup-shown");

  if (!popupShown) {
    setOpen(true);
    localStorage.setItem("ferticolombia-popup-shown", "true");
  }
}, []);

  // Carrusel automático
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [open]);

  const closePopup = () => {
    localStorage.setItem(
      "ferticolombia-popup",
      new Date().toDateString()
    );

    setOpen(false);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (!open) return null;

  return (
    <div
      onClick={closePopup}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-[920px]"
      >
        {/* Cerrar */}
        <button
          onClick={closePopup}
          className="absolute right-4 top-4 z-30 rounded-full bg-white/100 p-2 shadow-lg transition hover:scale-150"
        >
          <X size={22} />
        </button>
        {/* Imagen */}
        <div className="aspect-[16/9] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={banners[current]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-h-[80vh] w-auto object-contain mx-auto w-fit"
            />
          </AnimatePresence>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 rounded-full transition-all ${
                current === i
                  ? "w-8 bg-white"
                  : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}