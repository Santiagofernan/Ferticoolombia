import img25424 from "@/assets/products/25-4-24.avif";
import imgKatiuska from "@/assets/products/katiuska.avif";
import imgMitakron from "@/assets/products/mitakron.avif";
import imgPlatanate from "@/assets/products/cplatanate.avif";
import imgSpasiva from "@/assets/products/spasiva.avif";
import imgBonanza from "@/assets/products/bonanza.avif";
/*Fichas*/
import mitakronFicha from "@/assets/fichas/mitakron.avif";
import katiuskaFicha from "@/assets/fichas/katiuska.avif";
import platanateFicha from "@/assets/fichas/platanate.avif";
import ficha25424 from "@/assets/fichas/25-4-24.avif";
import spasivaFicha from "@/assets/fichas/spasiva.avif";
import bonanzaFicha from "@/assets/fichas/bonanza.avif";

export interface IProduct {
  slug: string;
  name: string;
  formula: string;
  ficha: string;
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
    ficha: mitakronFicha,
    tagline: "Desarrollo vegetativo sostenible y levante garantizado",
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
    ficha: katiuskaFicha,
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
    ficha: platanateFicha,
    tagline: "Maduración del fruto junto con mejoras en calidad y tamaño",
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
    ficha: spasivaFicha,
    tagline: "Mezcla física premium NPK",
    description:
      "Mezcla física Premium con fuentes de alta eficiencia y asimilación de NPK. Formulada para etapas de máxima demanda vegetativa y productiva del cultivo.",
    benefits: [
      "Eco amigable con el medio ambiente",
      "Menor concentración de metales pesados",
      "Rendimiento superior por hectárea",
    ],
    icaRegistration: "ICA 10233",
    image: imgSpasiva,
  },
  {
    slug: "bonanza",
    name: "Bonanza",
    formula: "19-9-19 + 1 (CaO)",
    ficha: bonanzaFicha,
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
    slug: "25-4-24",
    name: "25-4-24",
    formula: "NPK 25-4-24",
    ficha: ficha25424,
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
];