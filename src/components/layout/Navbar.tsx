import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoIcon from "@/assets/brand/logo-icon.avif";

const links = [
  { label: "Inicio", href: "#top" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Productos", href: "#productos" },
  { label: "Cultivos", href: "#cultivos" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // set active based on pathname (route pages)
    const checkPath = () => {
      const p = window.location.pathname || "/";
      if (p.includes("impacto")) {
        setActive("/impacto-agronomico");
      } else if (p === "/" || p === "") {
        // keep anchor-based active; don't overwrite
      } else {
        setActive(p);
      }
    };
    checkPath();
    window.addEventListener("popstate", checkPath);
    return () => window.removeEventListener("popstate", checkPath);
  }, []);

  useEffect(() => {
    // observe sections for in-page anchors and update active when visible
    const anchorHrefs = links.map((l) => l.href).filter((h) => h.startsWith("#"));
    const els = anchorHrefs
      .map((h) => document.getElementById(h.replace(/^#/, "")))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { root: null, threshold: 0.5 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Use CSS `scroll-margin-top` on sections instead of JS offset calculations.

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/70 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
          : "bg-gradient-to-b from-black/40 via-black/15 to-transparent"
      }`}
      style={{ height: scrolled ? 72 : 92, ['--header-height' as any]: scrolled ? '72px' : '92px' } as React.CSSProperties}
    >
      <div className="container-fc flex h-full items-center justify-between gap-6">
        {/* Logo — ícono oficial + marca en texto negro para máxima legibilidad. */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Ferticoolombia">
          <div
            className={`rounded-2xl p-2 transition-all duration-500 ${
              scrolled
                ? "bg-white/95 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.18)]"
                : "bg-black/30 backdrop-blur-sm shadow-[0_8px_24px_-10px_rgba(0,0,0,0.35)]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <img src={logoIcon} alt="" className="h-9 w-auto transition-all duration-500" />
              <span
                className={`text-[17px] font-bold tracking-[0.12em] leading-none transition-colors duration-500 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                FERTICOOLOMBIA
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setActive(l.href)}
                className={`group relative px-4 py-2 text-[18px] font-semibold tracking-[0.005em] transition-all duration-300 ${
                  scrolled ? "text-foreground/85 hover:text-primary" : "text-white/90 hover:text-white"
                } ${isActive ? "text-primary scale-105" : ""}`}
              >
                <span className="relative">
                  {l.label}
                  <span
                    className={`pointer-events-none absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    } ${scrolled ? "bg-primary" : "bg-white"}`}
                  />
                </span>
              </a>
            );
          })}
        </nav>

      <div className="hidden lg:block shrink-0">
        {(() => {
          const isImpact = active === "/impacto-agronomico";
          return (
            <Link
              to="/impacto-agronomico"
              className={`btn-primary-fc animate-impact h-11 text-[14px] font-semibold transition-all duration-300 ${
                scrolled ? "" : "bg-white text-primary hover:bg-white hover:text-primary-dark shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)]"
              } ${isImpact ? "scale-105 shadow-xl" : ""}`}
            >
              Impacto Ferticoolombia
            </Link>
          );
        })()}
      </div>
        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden grid h-11 w-11 place-items-center rounded-xl border backdrop-blur transition-colors ${
            scrolled ? "border-border bg-background/80 text-foreground" : "border-white/30 bg-white/15 text-white"
          }`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full">
          <div className="mx-4 mt-3 mb-4 overflow-hidden rounded-3xl border border-white/10 bg-[#1E241D]/85 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />
            <nav className="relative px-5 py-5 flex flex-col">
              {links.map((l, i) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => {
                      setOpen(false);
                      setActive(l.href);
                    }}
                    className={`group flex items-center justify-between px-3 py-3.5 rounded-2xl text-[15px] font-semibold transition-all ${
                      isActive ? "bg-primary/10 text-primary scale-102 shadow-sm" : "text-white/90 hover:text-white hover:bg-white/30"
                    }`}
                    style={{ animation: `fadeSlide 400ms ease-out ${i * 50}ms both` }}
                  >
                    <span>{l.label}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-light opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
              <Link
                to="/impacto-agronomico"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-white text-primary-dark font-semibold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:bg-primary hover:text-white transition-colors"
              >
                Impacto Ferticoolombia
              </Link>            
              </nav>
          </div>
          <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
      )}
    </header>
  );
}