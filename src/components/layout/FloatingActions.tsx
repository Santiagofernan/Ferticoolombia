import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import whatsappIcon from "@/assets/brand/whatsapp.webp";
const WHATSAPP_NUMBER = "312 4804546";
const WHATSAPP_MSG = encodeURIComponent("Hola Ferticolombia, quisiera recibir asesoría sobre sus fertilizantes.");

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background/95 backdrop-blur text-foreground shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:text-primary"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
        </button>
      )}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
         className="group whatsapp-pulse grid place-items-center rounded-full text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.55)] transition hover:-translate-y-0.1"
        style={{ backgroundColor: "#ffffff" }}
      >
        <img src={whatsappIcon} alt="WhatsApp" className="h-16 w-16 object-contain rounded-full" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg transition group-hover:opacity-100">
          Chatea con nosotros
        </span>
      </a>
    </div>
  );
}
