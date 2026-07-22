import img210021 from "@/assets/products/c21-0-21.png";
import img25424 from "@/assets/products/c25-4-24.png";
import imgDap from "@/assets/products/cdap.png";
import imgKatiuska from "@/assets/products/ckatiuska.png";
import imgKcl from "@/assets/products/ckcl.png";
import imgMitakron from "@/assets/products/cmitakron.png";
import imgPlatanate from "@/assets/products/cplatanate.png";
import imgSpasiva from "@/assets/products/cspasiva.png";
import imgZaneta from "@/assets/products/czaneta.png";
import imgUrea from "@/assets/products/curea.png";
import imgYurika from "@/assets/products/cyurika.png";
import imgBonanza from "@/assets/products/cbonanza-300x300.png";

export interface IProduct {
  slug: string;
  name: string;
  formula: string;
  tagline: string;
  description: string;
  benefits: string[];
  image: string;
  /** Registro ICA vigente a nombre de COOCENTRAL. */
  icaRegistration?: string;
  /** Ruta al PDF de ficha técnica. Reemplazable cuando existan los PDFs oficiales. */
  datasheetUrl?: string;
}

export const products: IProduct[] = [
  {
    slug: "mitakron",
    name: "Mitakron",
    formula: "16-16-16 + 3,5 (CaO)",
    tagline: "Desarrollo vegetativo balanceado",
    description:
      "Fertilizante compuesto complejo NPK con calcio, de reacción líquida y alta asimilación. Ideal para las etapas de levante, desarrollo y sostén del cultivo.",
    benefits: [
      "Nutrición balanceada NPK + Ca",
      "Fuentes de alta eficiencia y asimilación",
      "Ideal para etapa de desarrollo vegetativo",
    ],
    icaRegistration: "ICA 9872",
    image: imgMitakron,
  },
  {
    slug: "katiuska",
    name: "Katiuska",
    formula: "18-6-18 + 2 (MgO) + 2 (S)",
    tagline: "Cargue y llenado del fruto",
    description:
      "Fertilizante complejo compuesto NPK con magnesio y azufre, ideal para las etapas de producción, cargue o cosecha. Aporta elementos secundarios para una nutrición más completa.",
    benefits: [
      "Aporta Mg y S secundarios",
      "Ayuda al llenado del fruto",
      "Fertilización más completa y eficiente",
    ],
    icaRegistration: "ICA 10233",
    image: imgKatiuska,
  },
  {
    slug: "platanate",
    name: "Platanate",
    formula: "15-4-30",
    tagline: "Engorde y maduración del fruto",
    description:
      "Fertilizante compuesto mezclado NPK con alta concentración de potasio. Recomendado para la fase de engorde y maduración en cultivos con altas exigencias de K: frutales, hortalizas, cítricos y plátano.",
    benefits: [
      "Mejora tamaño y calidad del fruto",
      "Alto aporte de potasio (K₂O 30%)",
      "Ideal para plátano, cítricos y hortalizas",
    ],
    icaRegistration: "ICA 12534",
    image: imgPlatanate,
  },
  {
    slug: "spasiva",
    name: "Spasiva",
    formula: "21-5-20",
    tagline: "Mezcla física premium NPK",
    description:
      "Mezcla física Premium con fuentes de alta eficiencia y asimilación de NPK. Formulada para etapas de máxima demanda vegetativa y productiva del cultivo.",
    benefits: [
      "Fuentes de alta eficiencia NPK",
      "Alta asimilación por la planta",
      "Rendimiento superior por hectárea",
    ],
    icaRegistration: "ICA 10233",
    image: imgSpasiva,
  },
  {
    slug: "bonanza",
    name: "Bonanza",
    formula: "19-9-19 + 1 (CaO)",
    tagline: "Fructificación y cargue de cosecha",
    description:
      "Fertilizante compuesto complejo NPK con calcio y fuentes de alta eficiencia. La mejor opción para lograr una cosecha óptima, con gran aporte en el proceso de fructificación y cargue.",
    benefits: [
      "Optimiza fructificación y cargue",
      "Balance NPK con calcio",
      "Fuentes de alta eficiencia agronómica",
    ],
    icaRegistration: "ICA 9873",
    image: imgBonanza,
  },
  {
    slug: "yurika",
    name: "Yurika",
    formula: "23-4-20 + 3 (MgO) + 4 (S)",
    tagline: "Nutrición completa con Mg y S",
    description:
      "Fertilizante complejo compuesto NPK con magnesio y azufre para aplicación al suelo. Formulación de alta concentración nitrogenada con aporte de elementos secundarios.",
    benefits: [
      "Alta carga de nitrógeno (23%)",
      "Aporte de Mg y S secundarios",
      "Nutrición completa para cultivos exigentes",
    ],
    image: imgYurika,
  },
  {
    slug: "urea",
    name: "Urea",
    formula: "46-0-0",
    tagline: "Fuente pura de nitrógeno",
    description:
      "Fertilizante simple nitrogenado granulado para aplicación al suelo. Fuente de nitrógeno de mayor concentración a nivel mundial, esencial para el desarrollo vegetativo.",
    benefits: [
      "46% de nitrógeno total",
      "Alta solubilidad en el suelo",
      "Fuente económica de N",
    ],
    image: imgUrea,
  },
  {
    slug: "zaneta",
    name: "Zaneta",
    formula: "26-4-22",
    tagline: "Máxima carga nitrogenada",
    description:
      "Fertilizante NPK de alta concentración de nitrógeno y potasio para cultivos de alta extracción y ciclos productivos exigentes.",
    benefits: [
      "Impulso vegetativo intenso",
      "Refuerzo de potasio productivo",
      "Excelente rendimiento por hectárea",
    ],
    image: imgZaneta,
  },
  {
    slug: "25-4-24",
    name: "25-4-24",
    formula: "NPK 25-4-24",
    tagline: "Nutrición de precisión granulada",
    description:
      "Fertilizante compuesto mezclado NPK para aplicación al suelo. Uso agrícola granulado, ideal para planes de fertilización técnicos.",
    benefits: [
      "Relación N-K optimizada",
      "Aplicación edáfica uniforme",
      "Alta eficiencia agronómica",
    ],
    image: img25424,
  },
  {
    slug: "21-0-21",
    name: "21-0-21",
    formula: "NPK 21-0-21",
    tagline: "Nitrógeno y potasio balanceados",
    description:
      "Fertilizante mezclado NPK sin fósforo, formulado para suelos con niveles suficientes de P y cultivos que requieren mantenimiento de N y K.",
    benefits: [
      "Ideal para mantenimiento nutricional",
      "Alta solubilidad",
      "Recomendado en suelos ricos en P",
    ],
    image: img210021,
  },
  {
    slug: "dap",
    name: "DAP",
    formula: "18-46-0",
    tagline: "Fósforo de alta concentración",
    description:
      "Fosfato diamónico granulado, fuente de fósforo y nitrógeno de alta pureza y solubilidad para siembra y establecimiento de cultivos.",
    benefits: [
      "Mayor fuente concentrada de P",
      "Estimula desarrollo radicular",
      "Estándar mundial en siembra",
    ],
    image: imgDap,
  },
  {
    slug: "kcl",
    name: "KCL Granulado",
    formula: "0-0-60",
    tagline: "Potasio puro para máximo rendimiento",
    description:
      "Cloruro de potasio granulado de alta pureza, fuente de potasio más utilizada a nivel mundial para la mayoría de cultivos agrícolas.",
    benefits: [
      "60% de K₂O soluble",
      "Mejora llenado y calidad",
      "Fuente económica de potasio",
    ],
    image: imgKcl,
  },
];
