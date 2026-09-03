import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, Clock, Headphones, MapPinned, Award } from "lucide-react";
import heroBg from "@/assets/hero/h3.avif";
import whatsappLogo from "@/assets/brand/whatsapp.webp";

const EASE = [0.22, 1, 0.36, 1] as const;

const WHATSAPP_NUMBER_DISPLAY = "+57 312 480 4546";
const WHATSAPP_NUMBER_RAW = "573124804546";
const EMAIL = "ferticoolombia@coocentral.co";
const PHONE_DISPLAY = "+57 312 480 4546";
const PHONE_RAW = "+57 312 480 4546";
const ADDRESS = "Garzón, Huila — Colombia";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola Ferticoolombia, quisiera recibir asesoría técnica sobre sus fertilizantes.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${WHATSAPP_MSG}`;

const trustItems = [
  { icon: Clock, label: "Respuesta rápida" },
  { icon: Headphones, label: "Asesoría técnica especializada" },
  { icon: MapPinned, label: "Cobertura nacional" },
  { icon: Award, label: "Más de 10 años de experiencia" },
];

const contactItems = [
  { icon: Phone, label: "Teléfono", value: PHONE_DISPLAY, href: `tel:${PHONE_RAW}` },
  { icon: Mail, label: "Correo", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Dirección", value: ADDRESS, href: null },
];

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" aria-hidden className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-[oklch(0.28_0.08_145/0.85)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.52_0.14_145/0.35),transparent_60%)]" />
      </div>

      <div className="container-fc relative z-10 py-24 lg:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            Hablemos
          </span>
          <h2 className="mt-6 font-display text-white leading-[1.05]">
            ¿Necesita asesoría <span className="text-primary-light">técnica</span> especializada?
          </h2>
          <p className="mt-6 text-lg text-white/75 max-w-2xl">
            Nuestro equipo está listo para acompañarlo en la nutrición y desarrollo de sus cultivos.
          </p>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {trustItems.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-light/15 text-primary-light">
                <t.icon className="h-4 w-4" strokeWidth={2.25} />
              </div>
              <span className="text-sm font-medium text-white/90 leading-tight">{t.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Main CTA grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* WhatsApp featured card */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="group relative overflow-hidden rounded-[28px] p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #23786e 0%, #1cbf58 55%, #20af55 100%)",
              boxShadow: "0 25px 60px -20px rgba(58, 242, 125, 0.55)",
            }}
          >
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:scale-110" />
            <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-black/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="shrink-0">
                <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <img src={whatsappLogo} alt="WhatsApp" className="h-14 w-14" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Canal principal</div>
                <div className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">WhatsApp Empresarial</div>
                <div className="mt-2 text-lg font-semibold text-white/95 tabular-nums">{WHATSAPP_NUMBER_DISPLAY}</div>
                <p className="mt-2 text-sm text-white/80">Respuesta inmediata de un asesor agronómico.</p>
              </div>
            </div>

            <div className="relative mt-8 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-[#128C7E] shadow-lg transition-all duration-300 group-hover:gap-3 group-hover:shadow-xl">
                Hablar con un asesor
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
                  <span className="relative h-2 w-2 rounded-full bg-white" />
                </span>
                En línea ahora
              </span>
            </div>
          </motion.a>

          {/* Contact details + primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 sm:p-10 backdrop-blur-xl"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">Otros canales</div>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">Contáctenos directamente</h3>

            <ul className="mt-6 space-y-1">
              {contactItems.map((item) => {
                const inner = (
                  <>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-light/15 text-primary-light transition-colors group-hover/row:bg-primary-light/25">
                      <item.icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                        {item.label}
                      </div>
                      <div className="mt-0.5 text-base font-medium text-white break-words">{item.value}</div>
                    </div>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group/row flex items-center gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-white/5"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl px-2 py-3">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_15px_40px_-10px_oklch(0.52_0.14_145/0.7)]"
            >
              Solicitar asesoría
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
