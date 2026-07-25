const EASE = [0.22, 1, 0.36, 1] as const;
import { motion } from "framer-motion";
import {
  Leaf,
  Zap,
  Award,
  BadgeCheck,
  Truck,
  Headphones,
} from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Formulaciones sostenibles",
    desc: "Nutrientes de alta eficiencia que cuidan el suelo y reducen el impacto ambiental.",
  },
  {
    icon: Zap,
    title: "Máxima eficiencia agronómica",
    desc: "Absorción optimizada y respuesta visible en el rendimiento del cultivo.",
  },
  {
    icon: Award,
    title: "Calidad premium",
    desc: "Materias primas importadas y procesos con control técnico riguroso.",
  },
  {
    icon: BadgeCheck,
    title: "Registros ICA vigentes",
    desc: "Todos nuestros productos cumplen con la normativa colombiana.",
  },
  {
    icon: Truck,
    title: "Distribución nacional",
    desc: "Cobertura logística en todo el territorio, del Caribe a la Amazonía.",
  },
  {
    icon: Headphones,
    title: "Asistencia agronómica",
    desc: "Equipo técnico disponible para acompañar cada etapa del cultivo.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="section-fc bg-surface">
      <div className="container-fc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >   
          <span className="inline-block text-xl font-semibold uppercase tracking-[0.2em] text-primary-light">
            Por qué Ferticoolombia
          </span>
          <h2 className="mt-4 font-display">
            Beneficios que marcan la diferencia
          </h2>
          <p className="mt-5 text-lg">
            Combinamos ciencia, logística y acompañamiento para entregar
            resultados medibles en el campo.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.1,
                ease: EASE,
              }}
              className="group relative rounded-[24px] border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] hover:border-primary/30"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <b.icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground font-display">
                {b.title}
              </h3>
              <p className="mt-3 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
