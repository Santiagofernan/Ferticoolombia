import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/brand/logo.avif";

const columns = [
  {
    title: "Empresa",
    links: [
      { label: "Inicio", href: "#top" },
      { label: "Nosotros", href: "#nosotros" },
      { label: "Beneficios", href: "#beneficios" },
      { label: "Contacto", href: "#contacto" },
      { label: "Cultivos", href: "#cultivos" },
      { label: "Productos", href: "#productos" },

    ],
  },
  {
    title: "Productos",
    links: [
      { label: "Mitakron", href: "#productos" },
      { label: "Katiuska", href: "#productos" },
      { label: "Platanate", href: "#productos" },
      { label: "Spasiva", href: "#productos" },
      { label: "Bonanza", href: "#productos" },
      { label: "25-4-24", href: "#productos" },
    ],
  },
  {
    title: "Cultivos",
    links: [
      { label: "Café", href: "#cultivos" },
      { label: "Plátano", href: "#cultivos" },
      { label: "Cítricos", href: "#cultivos" },
      { label: "Papa", href: "#cultivos" },
      { label: "Caña de azucar", href: "#cultivos" },
      { label: "Tomate", href: "#cultivos" },
    ],
  },
];

const socials = [
  { Icon: Facebook, label: "Facebook de Ferticoolombia", href: "https://www.facebook.com/profile.php?id=61556356763369" },
  { Icon: Instagram, label: "Instagram de Ferticoolombia", href: "https://www.instagram.com/ferticoolombia" },
];

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container-fc py-20">
        <div className="grid gap-12 lg:gap-16 xl:gap-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.5fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3" aria-label="Ferticoolombia">
              <img src={logo} alt="Ferticoolombia" className="h-12 w-auto" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/80 max-w-xs">
              Más de 10 años nutriendo el crecimiento del campo colombiano con fertilizantes de alta eficiencia.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/70 hover:text-primary-light hover:border-primary/60 transition"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/65 hover:text-primary-light transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white mb-5">Contacto</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary-light" strokeWidth={2} />
                <span>Garzón, Huila</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary-light" strokeWidth={2} />
                <a href="tel:(+57) 312 4804546 " className="hover:text-white transition">
                  +57 312 4804546
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary-light" strokeWidth={2} />
                <a href="mailto:contacto@ferticoolombia.com" className="hover:text-white transition break-all">
                  ferticoolombia@coocentral.co 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-fc py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p>© {new Date().getFullYear()} Ferticoolombia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
