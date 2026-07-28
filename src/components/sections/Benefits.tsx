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
    <section id="beneficios" className="bg-surface">
      <div   className="relative overflow-hidden section-fc bg-[#F7FAF8]">
        {/* Fondo animado */}
          <div className="absolute inset-0 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55), transparent 45%),
                    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.35), transparent 40%),
                    radial-gradient(circle at 50% 80%, rgba(255,255,255,0.30), transparent 45%)
                  `,
                }}
              />
            {/* Verde */}
            <motion.div
              animate={{
                x: [-120, 100, -120],
                y: [-80, 60, -80],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#3AA655]/35 blur-[220px]"
            />

            {/* Amarillo */}
            <motion.div
              animate={{
                x: [80, -60, 80],
                y: [50, -80, 50],
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 right-0 h-[420px] w-[420px] rounded-full bg-[#F2C94C]/28 blur-[150px]"
            />

            {/* Azul */}
            <motion.div
              animate={{
                x: [-80, 70, -80],
                y: [70, -50, 70],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-1/4 h-[450px] w-[450px] rounded-full bg-[#2F80ED]/25 blur-[260px]"
            />

            {/* Naranja */}
            <motion.div
              animate={{
                x: [50, -100, 50],
                y: [-40, 60, -40],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[-100px] right-[-80px] h-[420px] w-[420px] rounded-full bg-[#F2994A]/28 blur-[170px]"
            />
          </div>
          <div className="container-fc relative z-10">     
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >   
          <span className="inline-block text-xl font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">
            Por qué Ferticoolombia
          </span>
          <h2 className="mt-4 font-display text-[#1B4332]">
            Beneficios que marcan la diferencia
          </h2>
          <p className="mt-5 text-lg text-slate-700">
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
              className="group relative rounded-[24px] bg-white border border-green-300/30 p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-green-500"
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
      </div>
    </section>
  );
}